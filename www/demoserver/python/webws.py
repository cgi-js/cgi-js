import os
from flask import Flask, send_from_directory, render_template
from flask.helpers import safe_join
from flask_socketio import SocketIO, emit

# flask
# flask_socketio

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
static = safe_join(os.path.dirname(__file__), 'static')
socketio = SocketIO(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    return send_from_directory(static, 'index.html')


@socketio.event
def my_event(message):
    emit('my response', {'data': 'got it!'})


@socketio.on('msg')
def msg():
    # https://github.com/miguelgrinberg/Flask-SocketIO/blob/main/example/sessions.py
    emit('message', "Server: Hello from Server")


if __name__ == '__main__':
    # app.run()
    socketio.run(app)
