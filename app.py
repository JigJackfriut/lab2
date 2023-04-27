
from flask import Flask, jsonify, request
import random

app = Flask(__name__)

# List of registered users
users = []

# List of chat messages
messages = []

@app.route('/chat/register/<username>/<email>/<password>', methods=['POST'])
def register(username, email, password):
    # Check if username already exists
    for user in users:
        if user['username'] == username:
            return jsonify({'status': 'fail', 'error': 'Username already exists'})

    # Check if email already exists
    for user in users:
        if user['email'] == email:
            return jsonify({'status': 'fail', 'error': 'Email already exists'})

    # Check password length
    if len(password) < 6:
        return jsonify({'status': 'fail', 'error': 'Password must be at least 6 characters'})

    # Add user to list of registered users
    users.append({'username': username, 'email': email, 'password': password})

    return jsonify({'status': 'success'})

@app.route('/chat/login/<username>/<password>', methods=['POST'])
def login(username, password):
    # Check if username and password match
    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({'status': 'success'})

    return jsonify({'status': 'fail', 'error': 'Username or password is incorrect'})

@app.route('/chat/send/<message>', methods=['POST'])
def send(message):
    # Add message to list of chat messages
    messages.append({'username': random.choice(users)['username'], 'message': message})

    return jsonify({'status': 'success'})

@app.route('/chat/update', methods=['GET'])
def update():
    # Get current list of chat messages and current users
    current_messages = messages[-10:] # Get last 10 messages
    current_users = users

    # Return JSON response
    return jsonify({'status': 'success', 'messages': current_messages, 'users': current_users})

if __name__ == '__main__':
    app.run(debug=True, host='54.198.38.17', port=5000)
