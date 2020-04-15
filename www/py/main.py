
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
