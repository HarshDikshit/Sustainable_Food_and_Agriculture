from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import jsonify,Blueprint,request
from  config import Config
from werkzeug.security import generate_password_hash, check_password_hash


#creating blueprint
auth_bp= Blueprint('auth', __name__)

client = MongoClient(Config.MONGO_URI)
db = client.get_database('sfa')
collection = db['admin']

# Registration route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    # Check if user already exists
    existing_user = collection.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Hash the password and insert user into the database
    hashed_password = generate_password_hash(password)
    collection.insert_one({"username": username, "password": hashed_password})
    return jsonify({"message": "User registered successfully!"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Fetch user from the database
    user = collection.find_one({"username": username})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful!"})

