import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    const handleNextScreen = () => {
        // if (userRole === 'recruiter') {
        //     navigate('/recruiter');
        // } else if (userRole === 'applicant') {
        //     navigate('/applicant');
        // } else {
        //     alert('User role is not defined. Please log in again.');
        // }

        navigate('/chat'); 
    };

    return (
        <div style={styles.container}>
            {/* Centered Header Section */}
            <div style={styles.header}>
                <h1 style={styles.title}>Welcome to ApplicAgent</h1>
                <p style={styles.description}>
                    ApplicAgent bridges the gap between recruiters and applicants, streamlining the hiring process and enhancing the application experience.
                </p>
            </div>

            {/* Two-Column Layout for Recruiter and Applicant Sections */}
            <div style={styles.columns}>
                {/* Recruiter Section */}
                <div style={styles.column}>
                    <h2 style={styles.subtitle}>For Recruiters:</h2>
                    <p style={styles.text}>
                        Connect with top talent, automate repetitive tasks, and make smarter hiring decisions with ApplicAgent.
                    </p>
                </div>

                {/* Applicant Section */}
                <div style={styles.column}>
                    <h2 style={styles.subtitle}>For Applicants:</h2>
                    <p style={styles.text}>
                        Discover job opportunities effortlessly, receive tailored guidance, and stay informed throughout the application journey.
                    </p>
                </div>
            </div>

            {/* Get Started Button */}
            <button style={styles.getStartedButton} onClick={handleNextScreen}>
                Get Started
            </button>
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#242424',
        color: '#ffffff',
        padding: '20px',
        margin: 0,
        textAlign: 'center',
    },
    header: {
        marginBottom: '2rem',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#ffffff',
    },
    description: {
        fontSize: '1.5rem',
        color: '#e2e8f0',
        marginBottom: '2rem',
        maxWidth: '800px',
        lineHeight: '1.6',
    },
    columns: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '4rem',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '3rem',
    },
    column: {
        flex: 1,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: '1.75rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#ffffff',
    },
    text: {
        fontSize: '1.25rem',
        lineHeight: '1.5',
        color: '#cbd5e0',
    },
    getStartedButton: {
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '1rem 2rem',
        fontSize: '1.25rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
};

styles.getStartedButton[':hover'] = {
    backgroundColor: '#1d4ed8',
};
