// src/__tests__/SignUp.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../../Components/LoginSignUpPage/SignUp';

describe('SignUp Component', () => {
  test('renders the sign-up form with username and password inputs', () => {
    render(<SignUp setShowSignUp={() => {}} />);

    // Check if "Sign Up" header is present
    expect(screen.getByText('Sign Up')).toBeInTheDocument();

    // Check if create username and create password inputs are present
    expect(screen.getByLabelText('Create Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Create Password')).toBeInTheDocument();

    // Check if the "Create Account" button is present
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();

    // Check if "Back to Log In" link is present
    expect(screen.getByText('Back to Log In')).toBeInTheDocument();
  });

  test('calls goToLogin when "Back to Log In" link is clicked', () => {
    const goToLoginMock = jest.fn();
    render(<SignUp setShowSignUp={goToLoginMock} />);

    // Click on the "Back to Log In" link
    fireEvent.click(screen.getByText('Back to Log In'));

    // Verify that the mock function was called
    expect(goToLoginMock).toHaveBeenCalled();
  });
});
