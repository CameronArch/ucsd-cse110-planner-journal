import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../Components/LoginSignUpPage/Login';

describe('Login Component', () => {
  test('renders the login form with username and password inputs', () => {
    render(<Login/>);

    // Check if "Log In" header is present
    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument();

    // Check if the "Log In" button is present
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();

    // Check if username and password inputs are present
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Check if "Sign Up" link is present
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
