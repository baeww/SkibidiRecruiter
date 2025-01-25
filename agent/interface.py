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


class interview_agent:
    def __init__(self, jobID, applicantID):
        self.applicantID = applicantID
        job_description = get_knowledge(jobID)
        applicant_info = get_knowledge(applicantID)

        # Purposefully Kept Short
        system_message = f"""
            You are a friendly recruiter for a software company. Your task is to gather all the necessary information about the applicant in a conversational manner. 
            Be polite, engaging, and ask open-ended questions to allow the applicant to express themselves fully.
            Also do not ask for information that is already present in the current applicants information.

            Job Description: {job_description}

            Current Applicant's Information: {applicant_info}

            Guidelines:
            1. Start with a warm greeting and introduction.
            2. Ask questions to gather missing information from the job description.
            3. Allow the applicant to elaborate on their experiences and skills.
            4. Be encouraging and maintain a positive tone throughout the conversation.

            Keep the interview short (2 questions)

            After you believe you have all the nessecary information please return the following: "[END]"
            """
        
        self.messages = [
            {"role": "system", "content": system_message}
        ]
        
        self.interview_on = True

        self.summary = ""

    def begin_interview(self):
        self.messages.append({"role": "assistant", "content": "Hello! Thank you for joining me today."})
        self.messages.append({"role": "assistant", "content": "Let's begin the interview. What is your name?"})
    
        return ["Hello! Thank you for joining me today.", "Let's begin the interview. What is your name?"]

    def pass_in_response(self, response):
        self.messages.append({
            "role": "user", "content": response
        })

        client = OpenAI(api_key=openai_key)
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.messages
        )

        content = completion.choices[0].message.content
        self.messages.append({
            "role": "assistant", "content": content
        })

        if "[END]" in content:
            self.end_interview()

        return [content]

    def end_interview(self):
        self.interview_on = False
        self.messages.append({
            "role": "user", "content": "Summarize what you have learned about the applicant in a list. Do not add any other information"
        })
        client = OpenAI(api_key=openai_key)
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.messages
        )
        self.summary = completion.choices[0].message.content

        add_knowledge(self.applicantID, self.summary)
    


def add_knowledge(ID, text):
    db = client['KnowledgeBase']
    collection = db['agents']
    document = {
        'agentID': ID,
        'text': text
    }

    try:
        collection.insert_one(document)
        print(f"{ID} knowledge added successfully.")
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


def interview(jobID, applicantID):
    # starts the Interview
    ia = interview_agent(jobID, applicantID)

    """
    ia = interview_agent("recruiter1", "applicant1")
    print(ia.begin_interview())

    while ia.interview_on:
        applicant_input = str(input("Applicant: "))
        response = ia.pass_in_response(applicant_input)
        print(response)

    print(ia.summary)
    """

    return ia

# train_agent("recruiter1", "The Applicant should have ...")
# add_knowledge("applicant1", "I have 5 years of Job experience")
# print(get_knowledge("recruiter1"))
# print(ask_agent("recruiter1", "What should the applicant have?"))
