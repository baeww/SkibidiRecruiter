export default function Chat() {
    const jobs = ['Software Engineer', 'Data Analyst', 'Sales Manager']; 
    
    return (
        <div className='chat-container'>
            <div className='side-panel'>
                <h2 className='panel-header'>Jobs</h2>
                {jobs.map((job, index) => <p key={index}>{job}</p>)}
            </div>
            <div className='main-panel'>
                <h2 className='panel-header'>Chat</h2>
                <div className='message-area'>
                    <textarea className="message-box" placeholder="Send a message..." />
                    <button className="submit" onClick={() => fetch('http://127.0.0.1:5000/send-chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            text: document.querySelector('.message-box').value,
                            agent_id: 'your_agent_id_here', // Replace 'your_agent_id_here' with the actual agent_id
                        }),
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Error:', error))}>Submit</button>
                </div>
            </div>
        </div>
    );
}