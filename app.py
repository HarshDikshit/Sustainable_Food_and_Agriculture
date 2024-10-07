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
import torch
import logging
import pickle
from model.model_4.crop_model import predict_crop
from routes.item_routes import item_blueprint
from sklearnex import patch_sklearn
from routes.auth_route import auth_bp
from routes.weather_forecast_api import weather_bp
from routes.air_quality import airquality_bp
from routes.request_orders import request_orders
from routes.kisanvani import kisanvani
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from  config import Config
patch_sklearn()

#-------------------------------------------------------------------------------------------------------------------

# define model paths

#model_1
MODEL_1_PATH_CROP_PREDICTION_MODEL_INTEL = os.path.join('model', 'model_1','crop_prediction_model_intel.joblib' )
MODEL_1_PATH_SCALER_INTEL = os.path.join('model', 'model_1','scaler_intel.joblib' )

#model_2
MODEL_2_RF_PIPELINE = os.path.join('model', 'model_2','rf_pipeline.pkl' )
MODEL_2_SOIL_TYPE_ENCODER = os.path.join('model', 'model_2','soil_type_encoder.pkl' )
MODEL_2_CROP_TYPE_ENCODER = os.path.join('model', 'model_2','crop_type_encoder.pkl' )
MODEL_2_FERTNAME_ENCODER = os.path.join('model', 'model_2','fertname_encoder.pkl' )

#model_3
MODEL_3_PATH_CROP_DEMAND = os.path.join('model', 'model_3','Crop_demand.csv' )
MODEL_3_PATH_CROP_PRICE = os.path.join('model', 'model_3','Crop_price.csv' )
MODEL_3_PATH_CROP_DEMAND_MODEL = os.path.join('model', 'model_3','crop_demand_model.pth' )
MODEL_3_PATH_SCALER = os.path.join('model', 'model_3','scaler.pth' )
MODEL_3_PATH_X_SCALED = os.path.join('model', 'model_3','X_scaled.npy' )
MODEL_3_PATH_CROP_ENCODINGS = os.path.join('model', 'model_3','crop_encodings.npy' )
MODEL_3_PATH_LATEST_YEAR = os.path.join('model', 'model_3','latest_year.npy' )

# model_4
MODEL_4_PATH_CROP_PREDICTION_MODEL = os.path.join('model', 'model_4','crop_prediction_model2.joblib' )
MODEL_4_PATH_STATE = os.path.join('model', 'model_4','le_state2.joblib' )
MODEL_4_PATH_LE_SEASON = os.path.join('model', 'model_4','le_season2.joblib' )
MODEL_4_PATH_LE_CROP = os.path.join('model', 'model_4','le_crop2.joblib' )
MODEL_4_CROP_YIELD_CSV = os.path.join('model', 'model_4', 'crop_yield.csv')

#------------------------------------------------------------------------------------------------------------------

# Load the model and encoders

#model_1
model1 = joblib.load(MODEL_1_PATH_CROP_PREDICTION_MODEL_INTEL)
scaler1 = joblib.load(MODEL_1_PATH_SCALER_INTEL)

#model_2
rf_pipeline = pickle.load(open(MODEL_2_RF_PIPELINE, "rb"))
soil_type_encoder = pickle.load(open(MODEL_2_SOIL_TYPE_ENCODER, "rb"))
crop_type_encoder = pickle.load(open(MODEL_2_CROP_TYPE_ENCODER, "rb"))
fertname_encoder = pickle.load(open(MODEL_2_FERTNAME_ENCODER, "rb"))

#model_3
#INSIDE THE MODEL 3 BACKEND FUNCTION

#model_4
model4 = joblib.load('crop_prediction_model2.joblib')
le_season2 = joblib.load(MODEL_4_PATH_LE_SEASON)
le_state2 = joblib.load(MODEL_4_PATH_STATE)
le_crop2 = joblib.load(MODEL_4_PATH_LE_CROP)

#---------------------------------------------------------------------------------------------------------------------------

# Load datasets

#model_1
       #no need

#model_2
       #no need

#model_3
df_demand = pd.read_csv(MODEL_3_PATH_CROP_DEMAND)
df_price = pd.read_csv(MODEL_3_PATH_CROP_PRICE)

#model_4
pd.read_csv(MODEL_4_CROP_YIELD_CSV)

#--------------------------------------------------------------------------------------------------------------------------

# FUNCTION of BACKEND

       #model_3 only
            logging.basicConfig(level=logging.INFO)
            logger = logging.getLogger(__name__)
            
            class CropDemandModel(torch.nn.Module):
                def __init__(self, input_size):
                    super(CropDemandModel, self).__init__()
                    self.fc1 = torch.nn.Linear(input_size, 64)
                    self.fc2 = torch.nn.Linear(64, 32)
                    self.fc3 = torch.nn.Linear(32, 1)
                    self.relu = torch.nn.ReLU()
            
                def forward(self, x):
                    x = self.relu(self.fc1(x))
                    x = self.relu(self.fc2(x))
                    x = self.fc3(x)
                    return x
            
            def load_model_and_data():
                try:
                    model = CropDemandModel(input_size=8)
                    model.load_state_dict(torch.load(MODEL_3_PATH_CROP_DEMAND_MODEL))
                    model.eval()
                    
                    X_scaled = np.load(MODEL_3_PATH_X_SCALED)
                    crop_encodings = np.load(MODEL_3_PATH_CROP_ENCODINGS, allow_pickle=True).item()
                    latest_year = np.load(MODEL_3_PATH_LATEST_YEAR)
                    scaler = torch.load(MODEL_3_PATH_SCALER)
                    
                    # Load original data for fallback predictions
                    df_yearly = pd.read_csv(MODEL_3_PATH_CROP_DEMAND)
                    
                    logger.info(f"Model and data loaded successfully. Crop encodings: {crop_encodings}")
                    return model, X_scaled, crop_encodings, latest_year, scaler, df_yearly
                except Exception as e:
                    logger.error(f"Error in loading model and data: {e}")
                    raise
            
            def predict_next_year(model, scaler, X, crop_encodings, latest_year, df_yearly):
                try:
                    next_year = latest_year + 1
                    predictions = {}
                    
                    for crop, encoding in crop_encodings.items():
                        crop_data = df_yearly[df_yearly['Crop'] == crop].sort_values('Year')
                        if len(crop_data) == 0:
                            logger.warning(f"No data found for crop: {crop}")
                            continue
                        
                        # Use the last 3 years of data to calculate the average growth rate
                        last_3_years = crop_data.tail(3)
                        growth_rates = (last_3_years['Demand'].pct_change() + 1).dropna()
                        avg_growth_rate = growth_rates.mean()
                        
                        # Get the last known demand
                        last_known_demand = crop_data['Demand'].iloc[-1]
                        
                        # Predict using the model
                        crop_scaled_data = X[X[:, 1] == encoding]
                        if len(crop_scaled_data) > 0:
                            latest_crop_data = crop_scaled_data[-1]
                            prev_demand = latest_crop_data[-1]
                            next_year_data = np.array([[next_year, encoding] + list(latest_crop_data[2:-1]) + [prev_demand]])
                            next_year_scaled = scaler.transform(next_year_data)
                            next_year_tensor = torch.FloatTensor(next_year_scaled)
                            
                            with torch.no_grad():
                                model_prediction = model(next_year_tensor)
                            model_prediction = float(model_prediction.numpy()[0][0])
                        else:
                            model_prediction = None
                        
                        # Fallback prediction using average growth rate
                        fallback_prediction = last_known_demand * avg_growth_rate
                        
                        # Use model prediction if it's reasonable, otherwise use fallback
                        if model_prediction and 0.9 * last_known_demand <= model_prediction <= 1.1 * last_known_demand:
                            predictions[crop] = model_prediction
                        else:
                            predictions[crop] = fallback_prediction
                        
                        logger.info(f"{crop}: Model prediction: {model_prediction}, Fallback prediction: {fallback_prediction}, Final prediction: {predictions[crop]}")
                    
                    logger.info("Predictions generated successfully")
                    return predictions, next_year
                except Exception as e:
                    logger.error(f"Error in prediction: {e}")
                    raise
            
            model, X_scaled, crop_encodings, latest_year, scaler, df_yearly = load_model_and_data()

#---------------------------------------------------------------------------------------------------------------------------------------

#Flask app STARTS here

app = Flask(__name__)
app.config["MONGO_URI"] = Config.MONGO_URI
mongo = PyMongo(app)
from routes import product_routes

# Calling routes(blueprint)

#Registering the products route blueprint 
app.register_blueprint(product_routes.products)

#Registering the requests route blueprint 
app.register_blueprint(item_blueprint)

#Register the authentication blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')

#Register the weather blueprint
app.register_blueprint(weather_bp)

#Register the air quality  blueprint
app.register_blueprint(airquality_bp)

#Register the request_orders  blueprint
app.register_blueprint(request_orders)

# #Register the kisanvani  blueprint
app.register_blueprint(kisanvani)

print(f"scikit-learn version: {sklearn.__version__}")

#---------------------------------------------------------------------------------------------------------------------------


def predict_crops(input_data, top_n=5):
    input_data_scaled = scaler1.transform(input_data)
    probabilities = model1.predict_proba(input_data_scaled)[0]
    crop_names = model1.classes_
    crop_probabilities = list(zip(crop_names, probabilities))
    crop_probabilities.sort(key=lambda x: x[1], reverse=True)
    return crop_probabilities[:top_n]

#-------------------------- PREDICTIONS-----------------------------------------------------------------------------------------------


#-------model_1------------------------------Specific Crop Recommendation-------

@app.route('/predict', methods=['POST'])
def predict1():
    print("Received prediction request")  # Debug print
    try:
        data = request.json
        print("Received data:", data)  # Debug print
        features = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall']
        input_data = np.array([[float(data[feature]) for feature in features]])
        
        # Scale the input data using the Intel oneDAL scaler
        input_data_scaled = scaler1.transform(input_data)
        
        # Get probability estimates for all crops using the Intel oneDAL model
        probabilities = model1.predict_proba(input_data_scaled)[0]
        
        # Get the crop names (classes)
        crop_names = model1.classes_
        
        # Create a list of (crop, probability) tuples
        crop_probabilities = list(zip(crop_names, probabilities))
        
        # Sort the list by probability in descending order
        crop_probabilities.sort(key=lambda x: x[1], reverse=True)
        
        # Return the top 5 crops with their probabilities
        top_predictions = [{"crop": crop, "probability": float(prob)} for crop, prob in crop_probabilities[:5]]
        
        print("Predictions:", top_predictions)  # Debug print
        return jsonify({
            "status": "success",
            "predictions": top_predictions
        })
    except Exception as e:
        print("Error occurred:", str(e))  # Debug print
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 400


#------model_2--------------------------------Fertilizer Recommendation-----------

@app.route('/api/predict', methods=['POST'])
def predict2():
    data = request.json
    
    try:
        # Extract and process features
        features = [
            float(data['temperature']),
            float(data['humidity']),
            float(data['moisture']),
            soil_type_encoder.transform([data['soil']])[0],
            crop_type_encoder.transform([data['crop']])[0],
            float(data['nitrogen']),
            float(data['potassium']),
            float(data['phosphorous'])
        ]
        
        # Make prediction
        input_data = np.array([features])
        prediction = rf_pipeline.predict(input_data)
        
        # Decode prediction
        fertilizer = fertname_encoder.inverse_transform(prediction)[0]
        
        return jsonify({'prediction': fertilizer})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400



#---------model 3---------------------Food Demand this Year--------------------

@app.route('/predictions', methods=['GET'])
def predict3():
    try:
        predictions, next_year = predict_next_year(model, scaler, X_scaled, crop_encodings, latest_year, df_yearly)
        response = {
            'year': int(next_year),
            'predictions': predictions
        }
        logger.info(f"Prediction request processed successfully. Response: {response}")
        return jsonify(response)
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return jsonify({'error': 'An error occurred during prediction'}), 500



#---------model_4-------------Simple Crop Recommendation----------------------

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


#------------------------------------------------------------------------------------------------------------------------------------


@app.route('/')
def index():
    return jsonify({
        "status": "success",
        "message": "Server is running",
        "info": "Crop Prediction System using Intel oneDAL"
    })



if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
