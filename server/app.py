from flask import Flask, request, jsonify
from flask_cors import CORS

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agent.interface import train_agent

app = Flask(__name__)

CORS(app)

@app.route('/send-chat', methods=['POST'])
def send_chat():
    new_text = request.form.get('text')
    agent_id = request.form.get('agent_id')  # Add agent_id parameter
    # print(new_text)
    # print(agent_id)
    success = train_agent(agent_id, new_text)
    if success:
        return jsonify({
            'status': 'success',
            'message': 'Chat message processed successfully'
        })
    else:
        return jsonify({
            'status': 'error',
            'message': 'Failed to process chat message'
        }), 500

@app.route('/create-job', methods=['POST']) #called upon initial application submission
def create_job(): 
    return jsonify({
        'status': 'success',
        'message': 'Job created successfully'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5173)