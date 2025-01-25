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
                    <button className="submit">Submit</button>
                </div>
            </div>
        </div>
    );
}