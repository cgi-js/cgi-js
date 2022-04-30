import os
from flask import Flask, send_from_directory, render_template
from flask.helpers import safe_join

app = Flask(__name__)
static = safe_join(os.path.dirname(__file__), 'static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    return send_from_directory(static, 'index.html')

if __name__ == '__main__':
    app.run()
