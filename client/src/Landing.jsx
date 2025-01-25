import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing({ userRole }) {
    const navigate = useNavigate();

    const handleNextScreen = () => {
        if (userRole === 'recruiter') {
            navigate('/recruiter');
        } else if (userRole === 'applicant') {
            navigate('/applicant');
        } else {
            alert('User role is not defined. Please log in again.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to ApplicAgent</h1>
            <p style={styles.description}>
                ApplicAgent bridges the gap between recruiters and applicants, streamlining the hiring process and enhancing the application experience.
            </p>
            <div style={styles.section}>
                <h2 style={styles.subtitle}>For Recruiters:</h2>
                <p style={styles.text}>
                    Connect with top talent, automate repetitive tasks, and make smarter hiring decisions with ApplicAgent.
                </p>
            </div>
            <div style={styles.section}>
                <h2 style={styles.subtitle}>For Applicants:</h2>
                <p style={styles.text}>
                    Discover job opportunities effortlessly, receive tailored guidance, and stay informed throughout the application journey.
                </p>
            </div>
            <button style={styles.getStartedButton} onClick={handleNextScreen}>
                Get Started
            </button>
        </div>
    );
}

// Inline styles for JSX
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
        backgroundColor: '#242424',
        color: '#ffffff',
        padding: '0 2rem',
        margin: 0,
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#ffffff',
    },
    description: {
        fontSize: '1.5rem',
        marginBottom: '2rem',
        maxWidth: '800px',
        lineHeight: '1.6',
        color: '#e2e8f0',
    },
    section: {
        marginBottom: '2rem',
        maxWidth: '600px',
    },
    subtitle: {
        fontSize: '1.75rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
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
