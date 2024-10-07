from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.dbref import DBRef
from  config import Config

request_orders = Blueprint('request_orders', __name__)

client = MongoClient(Config.MONGO_URI)
db = client.get_database('sfa')
collection = db['orderAndRequest']
products =db['']
userCollection = db['admin']