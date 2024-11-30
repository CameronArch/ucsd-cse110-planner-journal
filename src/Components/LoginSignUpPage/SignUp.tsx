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
        setAlert({ message: 'Please Fill in Both Fields', type: 'error' });
        return;
      }
  
      if (accountContext.credentials.has(newUsername)) {
        setAlert({ message: 'Username Already Exists, Please Choose Another', type: 'error' });
        return;
      }
  
      accountContext.setCredentials((prev) => {
        const updatedCredentials = new Map(prev);
        updatedCredentials.set(newUsername, newPassword);
        return updatedCredentials;
      });
      
      setAlert({ message: 'Account Created Successfully', type: 'success' });
    };
  
    return (
      <div className="auth-container">
        {alert && <AlertBanner message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSignUp} className="auth-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor='create username'>Create Username</label>
          <input
            type="text"
            data-testid="create username"
            id="create username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor='create password'>Create Password</label>
          <input
            type="password"
            data-testid="create password"
            id="create password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button data-testid="create_account" type="submit">Create Account</button>
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