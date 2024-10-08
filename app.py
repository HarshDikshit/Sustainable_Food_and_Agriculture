from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import sklearn
from sklearnex import patch_sklearn
from routes.item_routes import item_blueprint
from routes.auth_route import auth_bp
from routes.weather_forecast_api import weather_bp
from routes.air_quality import airquality_bp
from routes.request_orders import request_orders
from model.model_1.backened_1 import backened_1
from model.model_2.backened_2 import backened_2
from model.model_3.backened_3 import backened_3
from model.model_4.backened_4 import backened_4
from routes.kisanvani import kisanvani
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from  config import Config
patch_sklearn()

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

#Register the kisanvani  blueprint
app.register_blueprint(kisanvani)

#Register the backened_1  blueprint
app.register_blueprint(backened_1)

#Register the backened_2  blueprint
app.register_blueprint(backened_2)

#Register the backened_3  blueprint
app.register_blueprint(backened_3)

#Register the backened_4  blueprint
app.register_blueprint(backened_4)


print(f"scikit-learn version: {sklearn.__version__}")

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
