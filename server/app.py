from flask import Flask, request, jsonify
from flask_cors import CORS

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agent.interface import add_knowledge, interview

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

uri = "mongodb+srv://agentAdmin:admin1234@knowledgebase.4qu4s.mongodb.net/?retryWrites=true&w=majority&appName=KnowledgeBase"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.KnowledgeBase
agents_collection = db.agents

@app.route('/get-all-info', methods=['GET'])
def get_all_info():
    try:
        # Query the database for entries where 'agentID' contains 'applicant'
        entries = agents_collection.find({'agentID': {'$regex': 'applicant'}})
        result = []
        for entry in entries:
            result.append({
                'agentID': entry['agentID'],
                'text': entry['text']
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

ia = interview('recruiter1', 'applicant3')

uri = "mongodb+srv://agentAdmin:admin1234@knowledgebase.4qu4s.mongodb.net/?retryWrites=true&w=majority&appName=KnowledgeBase"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.KnowledgeBase
agents_collection = db.agents

@app.route('/get-all-info', methods=['GET'])
def get_all_info():
    try:
        # Query the database for entries where 'agentID' contains 'applicant'
        entries = agents_collection.find({'agentID': {'$regex': 'applicant'}})
        result = []
        for entry in entries:
            result.append({
                'agentID': entry['agentID'],
                'text': entry['text']
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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