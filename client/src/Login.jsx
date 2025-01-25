import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to ApplicAgent</h1>
            <p style={styles.subtitle}>Choose your role to log in:</p>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.recruiterButton}
                    onClick={() => navigate('/recruiter')}
                >
                    Log in as Recruiter
                </button>
                <button
                    style={styles.applicantButton}
                    onClick={() => navigate('/applicant')}
                >
                    Log in as Applicant
                </button>
            </div>
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
        height: '100vh',
        backgroundColor: '#242424',
        color: '#ffffff',
        margin: 0,
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.5rem',
        color: '#e2e8f0',
        marginBottom: '3rem',
    },
    buttonContainer: {
        display: 'flex',
        gap: '2rem',
    },
    recruiterButton: {
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
    applicantButton: {
        backgroundColor: '#16a34a',
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
