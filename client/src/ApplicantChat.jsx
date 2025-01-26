import { useState, useEffect } from 'react'; 

export default function ApplicantChat() {
    const jobs = ['Software Engineer', 'Data Analyst', 'Sales Manager']; 

    const [jobDescription, setJobDescription] = useState('');
    const [response, setResponse] = useState(''); 
    const [descriptionsToDisplay, setDescriptionsToDisplay] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [displayDescription, setDisplayDescription] = useState(false);

    const handleSubmit = async () => {
        // setJobDescription('RESPONSE');
        // setSubmitted(true);
        
        const formData = new FormData();
        formData.append('text', jobDescription);
        formData.append('applicant_id', 'applicant1'); // Using a default agent ID for now
        formData.append('applicant_id', 'applicant3'); // Using a default agent ID for now
        formData.append('job_id', 95); 

        try {
            const response = await fetch('http://localhost:5000/send-chat-applicant', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (data.status === 'success') {
                setResponse(data.message);
                setSubmitted(true);
                // console.log('MESSAGE: ' + data.message); 
                console.log('Message sent successfully');
                document.getElementById('inputbox').value = "";
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleStartApplication = async () => {
        try {
            const response = await fetch('http://localhost:5000/start-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    job_id: 'recruiter1',
                    applicant_id: 'applicant3', // Using a default applicant ID for now
                },
            });
            const data = await response.json();
            console.log(data)
            if (data.status === 'success') {
                console.log('Application started successfully');
                // setJobDescription(data.message); // Assuming the response message is the job description
                const intro = data.message[0] + '\n' + data.message[1]
                setDescriptionsToDisplay(prevDescriptions => ['Recruiter Agent: ' + intro]);  
                setDisplayDescription(true);
            }
        } catch (error) {
            console.error('Error starting application:', error);
        }
    };

    useEffect(() => {
        if (submitted) {
            // setDescriptionsToDisplay(...jobDescription);
            setDescriptionsToDisplay(prevDescriptions => [...prevDescriptions, 'You: ' + jobDescription]);  
            setDescriptionsToDisplay(prevDescriptions => [...prevDescriptions,  'Recruiter Agent: ' + response]);  
            setDisplayDescription(true); 
        }
        setSubmitted(false); 
    }, [submitted]);

    return (
        <div className='chat-container'>
            <div className='side-panel'>
                <h2 className='panel-header'>Jobs</h2>
                {jobs.map((job, index) => <button className='job-button' onClick={handleStartApplication} key={index}>{job}</button>)}
            </div>
            <div className='main-panel'>
                <h2 className='panel-header'>Chat</h2>
                <div>
                    {displayDescription && 
                        descriptionsToDisplay.map((description, index) => 
                            <div 
                                className='description-area' 
                                key={index} 
                                dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />')
                                                                              .replace('You:', '<em><strong>You:</strong></em>')
                                                                              .replace('Recruiter Agent:', '<em><strong>Recruiter Agent:</strong></em>') 
                                }} 
                            />
                        )
                    }
                </div>
                <div className='message-area'>
                    <textarea id="inputbox" className="message-box" placeholder="Send a message..." onChange={(e) => setJobDescription(e.target.value)} />
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}   