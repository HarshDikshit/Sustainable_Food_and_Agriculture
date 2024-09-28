from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import traceback
from sklearn.ensemble import RandomForestClassifier
import sklearn
import os

from model.model_4.crop_model import predict_crop

# define model paths
MODEL_3_PATH_CROP_DEMAND = os.path.join('model', 'model_3','Crop_demand.csv' )

MODEL_3_PATH_CROP_PRICE = os.path.join('model', 'model_3','Crop_price.csv' )
MODEL_3_PATH_CROP_DEMAND_MODEL = os.path.join('model', 'model_3','crop_demand_model.joblib' )
MODEL_3_PATH_SCALER = os.path.join('model', 'model_3','scaler.joblib' )


# Load datasets
df_demand = pd.read_csv(MODEL_3_PATH_CROP_DEMAND)
df_price = pd.read_csv(MODEL_3_PATH_CROP_PRICE)

# Preprocess price data: aggregate monthly data to yearly
df_price['Date'] = pd.to_datetime(df_price['Year'].astype(str) + '-' + df_price['Month'].astype(str))
df_price_yearly = df_price.groupby(['Crop', 'Year'])['Price'].mean().reset_index()

# Merge datasets
df_combined = pd.merge(df_demand, df_price_yearly, on=['Crop', 'Year'])

# Prepare features and target
X = df_combined[['Import', 'Export', 'Production', 'Yield', 'Price']]
y = df_combined['Demand']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Make predictions
y_pred = model.predict(X_test_scaled)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"R-squared Score: {r2}")

# Save the model and scaler
joblib.dump(model, MODEL_3_PATH_CROP_DEMAND_MODEL)
joblib.dump(scaler, MODEL_3_PATH_SCALER)

# Feature importance
feature_importance = pd.DataFrame({'feature': X.columns, 'importance': model.feature_importances_})
print(feature_importance.sort_values('importance', ascending=False))

app = Flask(__name__)
CORS(app)

print(f"scikit-learn version: {sklearn.__version__}")

# define model paths
# model_1
MODEL_1_PATH_CROP_PREDICTION = os.path.join('model', 'model_1','crop_prediction_model.joblib' )
MODEL_1_PATH_SCALER = os.path.join('model', 'model_1','scaler.joblib' )

# model_2
MODEL_2_PATH_CROP_PREDICTION = os.path.join('model', 'model_2','fertilizer_model.joblib' )
MODEL_2_PATH_SCALER = os.path.join('model', 'model_2','scaler.joblib' )
MODEL_2_PATH_LE_SOIL = os.path.join('model', 'model_2','le_soil.joblib' )
MODEL_2_PATH_LE_CROP = os.path.join('model', 'model_2','le_crop.joblib' )

# model_4
MODEL_4_PATH_CROP_PREDICTION_MODEL = os.path.join('model', 'model_4','crop_prediction_model2.joblib' )
MODEL_4_PATH_STATE = os.path.join('model', 'model_4','le_state2.joblib' )
MODEL_4_PATH_LE_SEASON = os.path.join('model', 'model_4','le_season2.joblib' )
MODEL_4_PATH_LE_CROP = os.path.join('model', 'model_4','le_crop2.joblib' )
MODEL_4_CROP_YIELD_CSV = os.path.join('model', 'model_4', 'crop_yield.csv')


# Load the saved model and scaler
try:
    #model_1
    model1 = joblib.load(MODEL_1_PATH_CROP_PREDICTION)
    scaler1 = joblib.load(MODEL_1_PATH_SCALER)
    print(f"Loaded model type: {type(model1)}")

    # model_2
    # Load the saved model, scaler, and label encoders
    model2 = joblib.load(MODEL_2_PATH_CROP_PREDICTION)
    scaler2 = joblib.load(MODEL_2_PATH_SCALER)
    le_soil = joblib.load(MODEL_2_PATH_LE_SOIL)
    le_crop = joblib.load(MODEL_2_PATH_LE_CROP)

except Exception as e:
    print(f"Error loading model: {str(e)}")
    traceback.print_exc()

def predict_crops(input_data, top_n=5):
    input_data_scaled = scaler1.transform(input_data)
    probabilities = model1.predict_proba(input_data_scaled)[0]
    crop_names = model1.classes_
    crop_probabilities = list(zip(crop_names, probabilities))
    crop_probabilities.sort(key=lambda x: x[1], reverse=True)
    return crop_probabilities[:top_n]

@app.route('/api/predict_all', methods=['GET'])
def predict_all():
    # Get the latest year's data for each crop
    latest_data = df_combined.loc[df_combined.groupby('Crop')['Year'].idxmax()]
    
    predictions = {}
    
    for _, row in latest_data.iterrows():
        features = np.array([[
            row['Import'],
            row['Export'],
            row['Production'],
            row['Yield'],
            row['Price']
        ]])
        
        # Scale the features
        scaled_features = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(scaled_features)[0]
        
        predictions[row['Crop']] = float(prediction)
    
    return jsonify({'predictions': predictions})

@app.route('/predict', methods=['POST'])
def predict1():
    try:
        data = request.json
        nitrogen = float(data['nitrogen'])
        phosphorus = float(data['phosphorus'])
        potassium = float(data['potassium'])
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])
        
        input_data = np.array([[nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall]])
        top_crops = predict_crops(input_data)
        
        result = [{"crop": crop, "probability": float(prob)} for crop, prob in top_crops]
        return jsonify({'predictions': result, 'status': 'success'})
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e), 'status': 'error'}), 400
    
@app.route('/api/predict', methods=['POST'])
def predict3():
    data = request.json
    features = np.array([[
        float(data['temperature']),
        float(data['humidity']),
        float(data['moisture']),
        le_soil.transform([data['soil']])[0],
        le_crop.transform([data['crop']])[0],
        float(data['nitrogen']),
        float(data['potassium']),
        float(data['phosphorous'])
    ]])
    
    scaled_features = scaler2.transform(features)
    prediction = model2.predict(scaled_features)[0]
    
    return jsonify({'prediction': prediction})


model4 = joblib.load(MODEL_4_PATH_CROP_PREDICTION_MODEL)
le_season2 = joblib.load(MODEL_4_PATH_LE_SEASON)
le_state2 = joblib.load(MODEL_4_PATH_STATE)
le_crop2 = joblib.load(MODEL_4_PATH_LE_CROP)

pd.read_csv(MODEL_4_CROP_YIELD_CSV)


@app.route('/simple-predict', methods=['POST'])
def predict():
    data = request.json
    season = data['season']
    state = data['state']
    features1 = np.array([[
        le_season2.transform([data['season']])[0],
        le_state2.transform([data['state']])[0],
        data['season'],
        data['state']
    ]])
    prediction = predict_crop(season, state)
    prediction = predict_crop(season, state)
    return jsonify({'prediction': prediction})

#-------model 3-------------------
# Load pre-computed predictions and crop names

# path names
MODEL_3_PATH_NEXT_YEAR_PRED = os.path.join('model', 'model_3','next_year_predictions.npy' )

MODEL_3_PATH_SELECTED_CROP = os.path.join('model', 'model_3','selected_crops.npy' )

MODEL_3_PATH_LATEST_YEAR = os.path.join('model', 'model_3','latest_year.npy' )

predictions = np.load(MODEL_3_PATH_NEXT_YEAR_PRED)
selected_crops = np.load(MODEL_3_PATH_SELECTED_CROP)
latest_year = np.load(MODEL_3_PATH_LATEST_YEAR)

print("Loaded predictions:", predictions)
print("Selected crops:", selected_crops)
print("Latest year:", latest_year)

@app.route('/predictions', methods=['GET'])
def get_predictions():
    next_year = int(latest_year) + 1
    prediction_data = []
    for crop, demand in zip(selected_crops, predictions):
        prediction_data.append({
            "crop": str(crop),
            "year": next_year,
            "predicted_demand": float(demand)
        })
    
    print("Serving prediction data:", prediction_data)
    return jsonify(prediction_data)

@app.route('/')
def home():
    model_info = f"Model type: {type(model1).__name__}"
    return f"Crop Prediction API is running! scikit-learn version: {sklearn.__version__}. {model_info}"

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)