import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Recruiter() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'Siri@apple.com' && password === 'skibidi') {
      // alert('Login Successful!');
      //Redirect to chat (recruiter dashboard) 
      navigate('/chat');
    }
    else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recruiter Login</h1>
      <p style={styles.description}>
        Log in to manage job postings, review applications, and connect with top talent.
      </p>
      <div style={styles.form}>
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Password Input */}
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* Error Message */}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        {/* Login Button */}
        <button onClick={handleLogin} style={styles.loginButton}>
          Log In
        </button>
      </div>
    </div>
  );
}

// Inline styles for the recruiter login screen
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
        textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#2563eb',
  },
  description: {
    fontSize: '1.25rem',
        color: '#cbd5e0',
        marginBottom: '2rem',
        maxWidth: '600px',
  },
  form: {
    display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '400px',
  },
  input: {
     padding: '1rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '0.5rem',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        outline: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: '#f87171',
        fontSize: '0.875rem',
        textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '1rem',
        fontSize: '1.25rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  },
};

styles.loginButton[':hover'] = {
  backgroundColor: '#1d4ed8',
};
