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
orderAndRequestCollection = db['orderAndRequest']
productsCollection = db['products']
userCollection = db['admin']

@request_orders.route('/order_request', methods=['POST'])
def order_request():
    data = request.get_json()
    buyerId =data.get('buyerId')
    sellerId =data.get('sellerId')
    productId = data.get('productId')

    orderAndRequestCollection.insert_one({'buyerId':str(buyerId), 'sellerId': str(sellerId), 'productId': str(productId) })

    return jsonify({'message': 'order created successfully!'})

# get order 
@request_orders.route('/orders/<id>', methods=['GET'])
def getOrders(id):
    orderDetails = list(orderAndRequestCollection.find({'_id':str(id)}).sort('_id', 1))

    # Create an empty list to hold product information with user details
    order_list = []

    for order in orderDetails:
        order['_id'] = str(order['_id'])

        product_details = productsCollection.find_one({'_id': ObjectId(order['productId'])})

        seller_details= userCollection.find_one({'_id': ObjectId(order['sellerId'])})

        product_seller = {
            'product': {**product_details},
            'seller': {**seller_details}
        }
        order_list.append(product_seller)
    res = {
        'orders': order_list
    }
    return jsonify(res)

# get request 
@request_orders.route('/requests/<id>', methods=['GET'])
def getRequests(id):
    requestDetails = orderAndRequestCollection.find({'sellerId':str(id)})

    product_details = productsCollection.find_one({'_id': ObjectId(requestDetails['productId'])})

    buyer_details= userCollection.find_one({'_id': ObjectId(requestDetails['buyerId'])})

    res = {
        'product': {**product_details},
        'buyer': {**buyer_details}
    }
    return jsonify(res)