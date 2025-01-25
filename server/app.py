from flask import Flask, request, jsonify
from flask_cors import CORS

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agent.interface import train_agent

app = Flask(__name__)

CORS(app)

@app.route('/send-chat-recruiter', methods=['POST'])
def send_chat():
    new_text = request.form.get('text')
    agent_id = request.form.get('agent_id')  # Add agent_id parameter
    # print(new_text)
    # print(agent_id)
    # success = train_agent(agent_id, new_text)
    success = True
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

from flask import Flask, request

app = Flask(__name__)

@app.route('/hello-world')
def hello_world():
    return 'Hello World'


@app.route('/send-chat-applicant', methods=['POST'])
def send_chat():
    new_text = request.form.get('text')
    # success = train_agent(agent_id, new_text)
    question = get_next_prompt('user_id', 'job_id')

    if not question: #no more prompts
        send_application_to_recruiter('user_id', 'job_id')
        return jsonify({
            'status': 'success',
            'message': 'Application submitted'
        })

    return jsonify({
        'status': 'success',
        'prompt': question,
        'message': 'Additional Information Requested'
    })
    return

@app.route('/submit-application') #called upon initial application submission
def submit_application(): 
    job_id = request.args.get('job_id')
    user_id = request.args.get('user_id')

    start_convo(user_id, job_id) # adds to applied list, runs preprompt agent conversation

    #returns empty if done with prompts
    question = get_next_prompt(user_id, job_id)

    if not question: #no more prompts
        send_application_to_recruiter(user_id, job_id)
        return jsonify({
            'status': 'success',
            'message': 'Application submitted'
        })

    return jsonify({
        'status': 'success',
        'prompt': question,
        'message': 'Additional Information Requested'
    })

def get_next_prompt(user_id, job_id): #TODO: @Satya get next prompt from agent convo
    pass

def update_agent(new_text): #TODO: @Satya Agent update function
    pass

def send_application_to_recruiter(user_id, job_id): #TODO: score application, send to database
    pass



if __name__ == '__main__':
    app.run()



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5173)