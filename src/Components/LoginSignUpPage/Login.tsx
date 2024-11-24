import React, { useContext, useState } from 'react';
import './Auth.css';
import { AccountContext } from './AccountContext';
import AlertBanner from './AlertBanner';

interface LoginProps {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setShowSignUp }) => {
    const accountContext = useContext(AccountContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  
    const handleLogin = (event: React.FormEvent) => {
      event.preventDefault();
      
      if (!username.trim()) {
        setAlert({ message: 'Please enter a username.', type: 'error' });
        return;
      }
  
      if (!password.trim()) {
        setAlert({ message: 'Please enter a password.', type: 'error' });
        return;
      }
  
      if (!accountContext.credentials.has(username)) {
        setAlert({ message: 'Username does not exist', type: 'error' });
        return;
      }
  
      if (accountContext.credentials.get(username) !== password) {
        setAlert({ message: 'Incorrect password', type: 'error' });
        return;
      }
  
      accountContext.setUsername(username);
      accountContext.setPassword(password);
      accountContext.setIsLoggedIn(true);
    };
  
    return (
      <div className="auth-container">
        {alert && <AlertBanner message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleLogin} className="auth-form">
        <h2>Log In</h2>
        <div className="form-group">
        <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
        <div>
          Don't have an account?{" "}
          <button
            onClick={() => setShowSignUp(true)}
            className="link-button"
          >
            Sign Up
          </button>
        </div>
      </form>
      </div>
    );
  };
  
  export default Login;