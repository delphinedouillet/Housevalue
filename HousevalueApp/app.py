from flask import Flask
from flask import render_template

# Create an instance of our Flask app.
app = Flask(__name__)


# Set route
@app.route('/')
def index():

    # Return the template with the teams list passed in
    return render_template('index.html')

# Set route
@app.route('/housing')
def house():
    # Return the template with the teams list passed in
    return render_template('Housingvalue.html')


@app.route('/d3')
def d3():
    # Return the template with the teams list passed in
    return render_template('d3.html')

@app.route('/plot1')
def plot():
    # Return the template with the teams list passed in
    return render_template('plots.html')

if __name__ == "__main__":
    app.run(debug=True)
