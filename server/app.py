from flask import Flask, request, jsonify
from flask_cors import CORS

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agent.interface import add_knowledge, interview

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

ia = interview('recruiter1', 'applicant3')

@app.route('/send-chat-recruiter', methods=['POST'])
def send_chat_recruiter():  # renamed to avoid duplicate function name
    new_text = request.form.get('text')
    agent_id = request.form.get('agent_id')  # Add agent_id parameter
    # print(new_text)
    # print(agent_id)
    success = add_knowledge(agent_id, new_text)
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


@app.route('/hello-world')
def hello_world():
    return 'Hello World'

@app.route('/send-chat-applicant', methods=['POST'])
def send_chat_applicant():
    new_text = request.form.get('text')
    job_id = request.form.get("job_id")
    applicant_id = request.form.get("applicant_id")

    response = ''
    for string in ia.pass_in_response(new_text):
        response += string + "\n"

    
    if not ia.interview_on: #no more prompts
        send_application_to_recruiter('user_id', 'job_id')
        return jsonify({
            'status': 'success',
            'message': 'Application submitted'
        })

    return jsonify({
        'status': 'success',
        'message': response
    })
    return

@app.route('/start-application', methods=['POST']) #called upon initial application submission
def start_application(): 
    print("Triggered")
    job_id = request.args.get('job_id')
    applicant_id = request.args.get('applicant_id')

    ia = interview(job_id, applicant_id)
    response = ia.begin_interview() # adds to applied list, runs preprompt agent conversation

    

    if not ia.interview_on: #no more prompts
        send_application_to_recruiter('user_id', 'job_id')
        return jsonify({
            'status': 'success',
            'message': 'Application Complete'
        })
    return jsonify({
            'status': 'success',
            'message': response
        })


def get_next_prompt(user_id, job_id): #TODO: @Satya get next prompt from agent convo
    pass


def send_application_to_recruiter(user_id, job_id): #TODO: score application, send to database
    pass



if __name__ == '__main__':
    app.run()