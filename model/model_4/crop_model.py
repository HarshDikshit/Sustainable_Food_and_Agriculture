import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# model 4
MODEL_4_PATH_CROP_YIELD = os.path.join('model', 'model_4','crop_yield.csv' )
MODEL_4_PATH_CLEANED_CROP_YIELD = os.path.join('model', 'model_4','cleaned_crop_data.csv' )
MODEL_4_PATH_CROP_PREDICTION_MODEL = os.path.join('model', 'model_4','crop_prediction_model2.joblib' )
MODEL_4_PATH_STATE = os.path.join('model', 'model_4','le_state2.joblib' )
MODEL_4_PATH_LE_SEASON = os.path.join('model', 'model_4','le_season2.joblib' )
MODEL_4_PATH_LE_CROP = os.path.join('model', 'model_4','le_crop2.joblib' )

# Load the dataset
df = pd.read_csv(MODEL_4_PATH_CROP_YIELD)

# Clean the data
def clean_column(col):
    return col.strip() if isinstance(col, str) else col

# Apply cleaning to all columns
for column in df.columns:
    df[column] = df[column].apply(clean_column)

# Save the cleaned data
df.to_csv('cleaned_crop_data.csv', index=False)
print("Cleaned data saved to 'cleaned_crop_data.csv'")

# Prepare the features and target
X = df[['Season', 'State', 'Annual_Rainfall', 'Production', 'Yield']]
y = df['Crop']

# Encode categorical variables
le_season = LabelEncoder()
le_state = LabelEncoder()
le_crop = LabelEncoder()

X['Season'] = le_season.fit_transform(X['Season'])
X['State'] = le_state.fit_transform(X['State'])
y = le_crop.fit_transform(y)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate the model
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy}")

# Save the model and encoders
joblib.dump(clf, 'crop_prediction_model2.joblib')
joblib.dump(le_season, 'le_season2.joblib')
joblib.dump(le_state, 'le_state2.joblib')
joblib.dump(le_crop, 'le_crop2.joblib')


# Function to predict crops

def predict_crop(season, state):
    # Load the saved model and encoders
    model = joblib.load(MODEL_4_PATH_CROP_PREDICTION_MODEL)
    le_season = joblib.load(MODEL_4_PATH_LE_SEASON)
    le_state = joblib.load(MODEL_4_PATH_STATE)
    le_crop = joblib.load(MODEL_4_PATH_LE_CROP)
    
    # Load the cleaned data
    df = pd.read_csv(MODEL_4_PATH_CLEANED_CROP_YIELD)
    
    # Encode inputs
    season_encoded = le_season.transform([season.strip()])[0]
    state_encoded = le_state.transform([state.strip()])[0]
    
    # Get average values for other features
    avg_rainfall = df['Annual_Rainfall'].mean()
    avg_production = df['Production'].mean()
    avg_yield = df['Yield'].mean()
    
    # Make prediction
    input_data = [[season_encoded, state_encoded, avg_rainfall, avg_production, avg_yield]]
    prediction = model.predict_proba(input_data)
    
    # Get top 5 crops
    top_5_indices = prediction[0].argsort()[-5:][::-1]
    top_5_crops = le_crop.inverse_transform(top_5_indices)
    
    return top_5_crops.tolist()