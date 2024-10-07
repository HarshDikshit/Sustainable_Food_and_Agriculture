from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry
from datetime import datetime, timedelta


airquality_bp= Blueprint('airquality', __name__)


@airquality_bp.route('/api/air-quality', methods=['GET'])
def get_air_quality():
    # Setup the Open-Meteo API client with cache and retry on error
    cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)

    # API parameters
    url = "https://air-quality-api.open-meteo.com/v1/air-quality"
    params = {
        "latitude": 26.4652,
        "longitude": 80.3498,
        "current": ["pm10", "pm2_5", "carbon_monoxide", "uv_index", "uv_index_clear_sky"],
        "hourly": ["pm10", "pm2_5", "uv_index"],
        "past_days": 1,
        "forecast_days": 1
    }

    # Make the API request
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]

    # Process current air quality data
    current = response.Current()
    current_data = {
        "time": datetime.fromtimestamp(current.Time()).isoformat(),
        "pm10": current.Variables(0).Value(),
        "pm2_5": current.Variables(1).Value(),
        "carbon_monoxide": current.Variables(2).Value(),
        "uv_index": current.Variables(3).Value(),
        "uv_index_clear_sky": current.Variables(4).Value()
    }

    # # Process hourly air quality data
    # hourly = response.Hourly()
    # hourly_data = {
    #     "time": [datetime.fromtimestamp(t).isoformat() for t in hourly.Time()],
    #     "pm10": hourly.Variables(0).ValuesAsNumpy().tolist(),
    #     "pm2_5": hourly.Variables(1).ValuesAsNumpy().tolist(),
    #     "uv_index": hourly.Variables(2).ValuesAsNumpy().tolist()
    # }
    # Alternative hourly data processing
    hourly = response.Hourly()
    hourly_time = hourly.Time()
    hourly_data = {
        "time": [datetime.fromtimestamp(hourly_time).isoformat()] if isinstance(hourly_time, int) else [datetime.fromtimestamp(t).isoformat() for t in hourly_time],
        "pm10": hourly.Variables(0).ValuesAsNumpy().tolist(),
        "pm2_5": hourly.Variables(1).ValuesAsNumpy().tolist(),
        "uv_index": hourly.Variables(2).ValuesAsNumpy().tolist()
    }

    return jsonify({
        "current": current_data,
        "hourly": hourly_data
    })

