import { useState, useEffect } from 'react'; 

export default function Chat() {
    const jobs = ['Software Engineer', 'Data Analyst', 'Sales Manager']; 
    // const applicants = [
    //     {name: 'Saket Reddy', score: 95, summary: 'Pending'}, 
    //     {name: 'Satya Shah', score: 90, summary: 'Pending'}, 
    //     {name: 'Dhruvi Kadhiwala', score: 92, summary: 'Pending'}
    // ]
    const applicants = ['Saket Reddy', 'Satya Shah', 'Dhruvi Kadhiwala', 'William Bae', 'John Doe', 'Jane Doe'] 
    const [summaries, setSummaries] = useState([]);
    const [summariesLoaded, setSummariesLoaded] = useState(false); 
    const [scores, setScores] = useState([]);
    const [scoresLoaded, setScoresLoaded] = useState(false); 

    const [jobDescription, setJobDescription] = useState('');
    const [descriptionToDisplay, setDescriptionToDisplay] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [displayDescription, setDisplayDescription] = useState(false);

    const getAllInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-all-info', {
                method: 'GET',
            });
            
            const data = await response.json();
            setSummaries(data);
            setSummariesLoaded(true); 
            // console.log(data); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const getScore = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-score', {
                method: 'GET',
            });
            
            const data = await response.json();
            // console.log(data); 
            setScores(data); 
            setScoresLoaded(true); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        getAllInfo(); 
        getScore(); 
    }, []);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('text', jobDescription);
        formData.append('agent_id', 'recruiter1'); // Using a default agent ID for now

        try {
            const response = await fetch('http://localhost:5000/send-chat-recruiter', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (data.status === 'success') {
                setSubmitted(true);
                console.log('Message sent successfully');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        if (submitted) {
            setDescriptionToDisplay(jobDescription);
            console.log('JOB DESCRIPTION: ' + jobDescription)
            setDisplayDescription(true);
        }
        setSubmitted(false); 
    }, [submitted]);

    return (
        <div className='chat-container'>
            <div className='side-panel'>
                <h2 className='panel-header'>Jobs</h2>
                {jobs.map((job, index) => <button className='job-button' key={index}>{job}</button>)}
            </div>
            <div className='main-panel'>
                <h2 className='panel-header'>Job Description</h2>
                {displayDescription && <div className='description-area' dangerouslySetInnerHTML={{ __html: descriptionToDisplay.replace(/\n/g, '<br />') }} />}
                <div className='message-area'>
                    <textarea className="message-box" placeholder="Send a message..." onChange={(e) => setJobDescription(e.target.value)} />
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className='applicants-panel'>
                <h2 className='panel-header'>Applicants</h2>
                {/* {applicants.map((applicant, index) => <p key={index}>{applicant.name + ', ' + applicant.score}</p>)} */}
                {/* {applicants.map((applicant, index) => 
                    <details key={index} style={{ "marginBottom": "1rem" }}>
                        <summary>{applicant.name + ', ' + applicant.score}</summary>
                        <p style={{ "marginBottom": "2rem" }}>{applicant.summary}</p>
                    </details>
                )} */}
                {(summariesLoaded && scoresLoaded) ? applicants.map((applicant, index) => 
                    <details key={index} style={{ "marginBottom": "1rem" }}>
                        <summary>{applicant + ', ' + scores[index].score}</summary>
                        {/* <p>{"Summary: " + summaries[index].text}</p> */}
                        <p style={{ "marginBottom": "2rem" }}>{"Summary: " + scores[index].reason}</p>
                    </details>
                ) : <p>Loading...</p>}
            </div>
        </div>
    );
}

// Recruiter Agent: Hello! Thank you for joining me today.
// Let's begin the interview. What is your name?
// You: Hi, my name is Saket Reddy
// Recruiter Agent: Hello Saket! It's great to meet you. Thank you for taking the time to chat with me today. I'm looking forward to learning about your experiences and skills in software development.

// Could you share a bit about what you’ve been doing in your 3 years of experience? What specific projects have you worked on that you are particularly proud of?
// You: I've worked on a lot of things related to web dev and AI/ML, such as a full stack platform that helps students connect with scholarship donors
// Recruiter Agent: That sounds impressive! It’s wonderful to hear that you’ve been involved in web development and AI/ML, especially with a project that helps students connect with scholarship donors—what a meaningful initiative!

// Since the job description mentions a requirement of 5 years of experience in software development, I'm curious to know if you have any plans or interest in further developing your skills, particularly in Python, since it’s a language highlighted in this role. What do you think?
// You: I have a lot of interest in Python and a lot of experience with it, too. For example, I trained a neural network in Python and TensorFlow that helps startups predict whether they will qualify for loans they want
// Recruiter Agent: Application submitted