import { useState, useEffect } from 'react'; 

export default function Chat() {
    const jobs = ['Software Engineer', 'Data Analyst', 'Sales Manager']; 
    const applicants = [{name: 'Saket Reddy', score: 95}, {name: 'Satya Shah', score: 90}, {name: 'Dhruvi Kadhiwala', score: 92}]
    
    const [jobDescription, setJobDescription] = useState('');
    const [descriptionToDisplay, setDescriptionToDisplay] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [displayDescription, setDisplayDescription] = useState(false);

    useEffect(() => {
        if (submitted) {
            setDescriptionToDisplay(jobDescription);
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
                    <button className="submit" onClick={() => setSubmitted(true)}>Submit</button>
                </div>
            </div>
            <div className='applicants-panel'>
                <h2 className='panel-header'>Applicants</h2>
                {applicants.map((applicant, index) => <p key={index}>{applicant.name + ', ' + applicant.score}</p>)}
            </div>
        </div>
    );
}