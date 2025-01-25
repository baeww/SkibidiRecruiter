from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from openai import OpenAI
import os


# Create env file where API_KEY is stored
load_dotenv()
openai_key = os.getenv('API_KEY')

uri = "mongodb+srv://agentAdmin:admin1234@knowledgebase.4qu4s.mongodb.net/?retryWrites=true&w=majority&appName=KnowledgeBase"
client = MongoClient(uri, server_api=ServerApi('1'))

def train_agent(agentID, text):
    db = client['KnowledgeBase']
    collection = db['agents']
    document = {
        'agentID': agentID,
        'text': text
    }

    try:
        collection.insert_one(document)
        print(f"Agent {agentID} trained successfully.")
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

def get_knowledge(agentID):
    db = client['KnowledgeBase']
    collection = db['agents']
    documents = collection.find({'agentID': agentID})
    return [doc['text'] for doc in documents]

# ask the agent a question based on its knowledge
def ask_agent(agentID, question):
    client = OpenAI(api_key=openai_key)
    agent_knowledge = get_knowledge(agentID)

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"Here's the background: {agent_knowledge} Please answer any questions."},
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return completion.choices[0].message.content   



# train_agent("recruiter1", "The Applicant should have ...")
# train_agent("applicant1", "")
# print(get_knowledge("recruiter1"))
# print(ask_agent("recruiter1", "What should the applicant have?"))