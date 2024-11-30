import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../Components/LoginSignUpPage/Login';
import { AccountContext } from '../../Components/LoginSignUpPage/AccountContext';

describe('Login Error Messages', () => {
  test('test various login errors', () => {
    
    const mockContext = {
        isLoggedIn: false,
        setIsLoggedIn: jest.fn(),
        username: null,
        setUsername: jest.fn(),
        password: null,
        setPassword: jest.fn(),
        credentials: new Map([["Admin", "12345"]]),
        setCredentials: jest.fn(),
    };

    render(<AccountContext.Provider value={mockContext}>
        <Login setShowSignUp={() => { } }/>
        </AccountContext.Provider>);

    const login = screen.getByTestId('login');
    fireEvent.click(login);
    expect(screen.getByText('Please Enter a Username')).toBeInTheDocument();
    expect(mockContext.setIsLoggedIn).not.toBeCalled();
    expect(mockContext.setUsername).not.toBeCalled();
    expect(mockContext.setPassword).not.toBeCalled();

    const usernameInput = screen.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.click(login);
    expect(screen.getByText('Please Enter a Password')).toBeInTheDocument();
    expect(mockContext.setIsLoggedIn).not.toBeCalled();
    expect(mockContext.setUsername).not.toBeCalled();
    expect(mockContext.setPassword).not.toBeCalled();

    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(login);
    expect(screen.getByText('Username Does Not Exist')).toBeInTheDocument();
    expect(mockContext.setIsLoggedIn).not.toBeCalled();
    expect(mockContext.setUsername).not.toBeCalled();
    expect(mockContext.setPassword).not.toBeCalled();

    fireEvent.change(usernameInput, { target: { value: 'Admin' } });
    fireEvent.click(login);
    expect(screen.getByText('Incorrect Password')).toBeInTheDocument();
    expect(mockContext.setIsLoggedIn).not.toBeCalled();
    expect(mockContext.setUsername).not.toBeCalled();
    expect(mockContext.setPassword).not.toBeCalled();

    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(login);
    expect(mockContext.setIsLoggedIn).toBeCalled();
    expect(mockContext.setUsername).toBeCalled();
    expect(mockContext.setPassword).toBeCalled();

  });

  test('calls goToSignUp when "Sign Up" link is clicked', () => {
    const goToSignUpMock = jest.fn();
    render(<Login setShowSignUp={goToSignUpMock} />);

    // Click on the "Sign Up" link
    fireEvent.click(screen.getByText('Sign Up'));

    // Verify that the mock function was called
    expect(goToSignUpMock).toHaveBeenCalled();
  });
});
