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
        backgroundColor: '#f3f4f6',
        margin: 0,
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#374151',
        marginBottom: '2rem',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem',
    },
    recruiterButton: {
        backgroundColor: '#3b82f6',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    applicantButton: {
        backgroundColor: '#10b981',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};
