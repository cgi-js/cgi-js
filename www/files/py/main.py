
from flask import Flask
__name__ = "hello"
app = Flask(__name__)


@app.route('/s')
def fns():
    return 'Hello, World! - S'

@app.route('/')
def index():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()


// // Run flask application
// FLASK_APP=./www/py/main.py FLASK_ENV=development flask run
