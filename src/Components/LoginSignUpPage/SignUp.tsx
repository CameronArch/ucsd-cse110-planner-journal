import React, { useState, useContext } from 'react';
import { AccountContext } from './AccountContext';
import AlertBanner from './AlertBanner';

interface SignUpProps {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setShowSignUp }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
    const accountContext = useContext(AccountContext);
  
    const handleSignUp = async (event: React.FormEvent) => {
      event.preventDefault();
      if (!newUsername || !newPassword) {
        setAlert({ message: 'Please fill in both fields.', type: 'error' });
        return;
      }
  
      if (accountContext.credentials.has(newUsername)) {
        setAlert({ message: 'Username already exists. Please choose another.', type: 'error' });
        return;
      }
  
      accountContext.setCredentials((prev) => {
        const updatedCredentials = new Map(prev);
        updatedCredentials.set(newUsername, newPassword);
        return updatedCredentials;
      });
      
      setAlert({ message: 'Account created successfully!', type: 'success' });
    };
  
    return (
      <div className="auth-container">
        {alert && <AlertBanner message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSignUp} className="auth-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Create Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Create Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
        <button
          type="button"
          onClick={() => setShowSignUp(false)}
          className="link-button"
        >
          Back to Log In
        </button>
      </form>
      </div>
    );
  };

export default SignUp;