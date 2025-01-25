from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain.schema import HumanMessage, AIMessage, SystemMessage
from langgraph.checkpoint.memory import MemorySaver



import os
from dotenv import load_dotenv

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv('API_KEY')

def ask_question(question: str) -> str:
    """Ask the applicant a question and return their response."""
    return input(question + " ")

tools = [ask_question]

# Create the agent with memory
model = ChatOpenAI(model="gpt-3.5-turbo")
memory = MemorySaver()

job_description = """
The Applicant should have 5 years of experience in software development.
The Applicant should have a degree in Computer Science.
The Applicant should have experience in Python and Java.
"""

applicant_info = """I have 5 years of Job experience"""


system_message = SystemMessage(content=f"""
You are a friendly recruiter for a software company. Your task is to gather all the necessary information about the applicant in a conversational manner. Be polite, engaging, and ask open-ended questions to allow the applicant to express themselves fully.

Job Description: {job_description}

Current Applicant's Information: {applicant_info}

Guidelines:
1. Start with a warm greeting and introduction.
2. Ask questions to gather missing information from the job description.
3. Allow the applicant to elaborate on their experiences and skills.
4. Be encouraging and maintain a positive tone throughout the conversation.

Remember to document your thoughts in detail after each interaction.
"""
)

agent_executor = create_react_agent(
    model, 
    tools,
    messages_modifier = system_message,
    checkpointer=memory
)

def run_interview():
    print("Recruiter: Hello! Thank you for joining me today.")
    print("Let's begin the interview. What is your name?")

    while True:
        # The agent asks a question
        query = input("You: (Type 'end' to stop the interview) ")
        if query.lower() == 'end':
            break

        # Pass the user's response and let the agent reflect and ask the next question
        response = agent_executor.invoke({"messages": query}, {"configurable": {"thread_id": "abc123"}})
        recruiter_response = response["messages"][-1].content

        print(f"Recruiter: {recruiter_response}")

    # Summarize the interview at the end
    summary = agent_executor.invoke({"messages": "Summarize what you have learned about the applicant in a list. Do not add any other information"}, {"configurable": {"thread_id": "abc123"}})
    print("\nSummary of the interview:")
    print(summary["messages"][-1].content)

# Run the interview
if __name__ == "__main__":
    run_interview()