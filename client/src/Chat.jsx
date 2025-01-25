import { useState, useEffect } from 'react'; 

export default function Chat() {
    const jobs = ['Software Engineer', 'Data Analyst', 'Sales Manager']; 
    const applicants = [{name: 'Saket Reddy', score: 95}, {name: 'Satya Shah', score: 90}, {name: 'Dhruvi Kadhiwala', score: 92}]
    
    const [jobDescription, setJobDescription] = useState('');
    const [descriptionToDisplay, setDescriptionToDisplay] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [displayDescription, setDisplayDescription] = useState(false);

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
                {applicants.map((applicant, index) => <p key={index}>{applicant.name + ', ' + applicant.score}</p>)}
            </div>
        </div>
    );
}