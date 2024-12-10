import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../_utils/firebase'; // Adjust path to where Firebase is initialized

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setMessage(`Welcome back, ${userCredential.user.email}`);
      onClose(); // Close the modal on successful login
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 2000,
    borderRadius: '8px',
  };

  const overlayStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <h2 style={{ fontFamily: 'Montserrat-Bold', fontSize: '30px' }}>
          Login
        </h2>
        <div
          style={{
            fontFamily: 'Montserrat-semiBold',
            fontSize: '12px',
            color: '#C35640',
          }}
        >
          This feature is only available to the bride or groom-to-be.
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: '10px',
            backgroundColor: '#C35640',
            color: '#fff',
            border: 'none',
            width: '100%',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'Montserrat-semiBold',
          }}
        >
          Login
        </button>
        {message && (
          <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
        )}
      </div>
    </>
  );
};

export default AuthModal;
