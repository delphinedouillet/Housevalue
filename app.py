from flask import Flask, render_template

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

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
    Housing = list(db.Housing.find())
    print(Housing)

    # Return the template with the teams list passed in
    return render_template('index.html',Housing=Housing)

# Set route
@app.route('/housing')
def house():
    # Return the template with the teams list passed in
    return render_template('Housingvalue.html')


if __name__ == "__main__":
    app.run(debug=True)