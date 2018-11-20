from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
import pymongo


# Create an instance of our Flask app.
app = Flask(__name__)

# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'map_db'
# COLLECTION_NAME = 'Housing'
# FIELDS = {'RegionID': True, '_id': True}

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.map_db


# Set route
@app.route('/')
def index():
    # Store the entire team collection in a list
    Housing = list(db.housing.find())
    print(Housing)

    # Return the template with the teams list passed in
    return render_template('index.html',Housing=Housing)

# Set route
@app.route('/housing')
def house():
    # Return the template with the teams list passed in
    return render_template('Housingvalue.html')

# Set route
@app.route('/2001')
def year2001():
    # Return the template with the teams list passed in
    return render_template('Year2001.html')

# Set route
@app.route('/index2001')
def index2001():
    # Return the template with the teams list passed in
    return render_template('indexYear2001.html')

# Set route
@app.route('/2005')
def year2005():
    # Return the template with the teams list passed in
    return render_template('Year2005.html')

# Set route
@app.route('/index2005')
def index2005():
    # Return the template with the teams list passed in
    return render_template('indexYear2005.html')

# Set route
@app.route('/2010')
def year2010():
    # Return the template with the teams list passed in
    return render_template('Year2010.html')

# Set route
@app.route('/index2010')
def index2010():
    # Return the template with the teams list passed in
    return render_template('indexYear2010.html')

# Set route
@app.route('/2015')
def year2015():
    # Return the template with the teams list passed in
    return render_template('Year2015.html')

# Set route
@app.route('/index2015')
def index2015():
    # Return the template with the teams list passed in
    return render_template('indexYear2015.html')

@app.route('/d3')
def d3():
    # Return the template with the teams list passed in
    return render_template('d3.html')

# @app.route("/Housingdata")
# def Housingdata():
#     connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
#     collection = connection[DBS_NAME][COLLECTION_NAME]
#     projects = collection.find(projection=FIELDS)
#     json_projects = []
#     for project in projects:
#         json_projects.append(project)
#     json_projects = json.dumps(json_projects, default=json_util.default)
#     connection.close()
#     return json_projects

if __name__ == "__main__":
    app.run(debug=True)
