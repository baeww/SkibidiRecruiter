from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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
    pass



# train_agent("recruiter1", "The Applicant should have 5 years of experience in software development.")
# print(get_knowledge("recruiter1"))