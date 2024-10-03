import pandas as pd
import numpy as np

def load_and_validate_data(file_path, expected_columns):
    df = pd.read_csv(file_path)
    missing_columns = set(expected_columns) - set(df.columns)
    if missing_columns:
        raise ValueError(f"Missing columns in {file_path}: {', '.join(missing_columns)}")
    return df

try:
    df_yearly = load_and_validate_data('Crop_demand.csv', ['Crop', 'Year', 'Import', 'Export', 'Production', 'Yield', 'Demand'])
    df_monthly = load_and_validate_data('Crop_price.csv', ['Crop', 'Month', 'Year', 'Price'])

    #aggregate monthly data to yearly
    df_monthly['Year'] = df_monthly['Year'].astype(int)
    df_price_yearly = df_monthly.groupby(['Crop', 'Year'])['Price'].mean().reset_index()

    #merging
    df_combined = pd.merge(df_yearly, df_price_yearly, on=['Crop', 'Year'], how='left')

    
    df_combined['Price'].fillna(df_combined.groupby('Crop')['Price'].transform('mean'), inplace=True)

    #string
    df_combined['Crop'] = pd.Categorical(df_combined['Crop'])

    #encoding
    crop_encodings = {crop: idx for idx, crop in enumerate(df_combined['Crop'].cat.categories)}
    df_combined['Crop_Encoded'] = df_combined['Crop'].map(crop_encodings)

    features = ['Year', 'Crop_Encoded', 'Import', 'Export', 'Production', 'Yield', 'Price']
    target = 'Demand'

    X = df_combined[features]
    y = df_combined[target]

    
    df_combined.to_csv('processed_data.csv', index=False)
    np.save('X.npy', X)
    np.save('y.npy', y)
    np.save('crop_encodings.npy', crop_encodings)

    print("Data preprocessing completed successfully.")

except FileNotFoundError as e:
    print(f"Error: {e}. Please make sure the dataset files are in the correct location.")
except ValueError as e:
    print(f"Error: {e}. Please check your dataset files and ensure they contain the required columns.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")