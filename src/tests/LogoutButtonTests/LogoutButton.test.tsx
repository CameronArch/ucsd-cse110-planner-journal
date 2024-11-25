import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutButton from '../../Components/CalendarPage/Calendar-Page';
import { AccountContext } from '../../Components/LoginSignUpPage/AccountContext';
import { TaskMenuContext } from '../../Components/TaskMenu/TaskMenuContext';


test('calls context methods on logout', () => {
    const mockAccountContext = {
        isLoggedIn: true, 
        username: null,    
        password: null,
        setIsLoggedIn: jest.fn(),
        setUsername: jest.fn(),
        setPassword: jest.fn(),
        credentials: new Map(),
        setCredentials: jest.fn(),
    };
    
    const mockTaskMenuContext = {
        currentDate: null,
        isOpen: false,
        tasks: {},
        addTask: jest.fn(),
        removeTask: jest.fn(),
        setIsOpen: jest.fn(),
        setCurrentDate: jest.fn(),
        setTasks: jest.fn(),
    };

    const renderWithProviders = () =>
        render(
            <AccountContext.Provider value={mockAccountContext}>
                <TaskMenuContext.Provider value={mockTaskMenuContext}>
                    <LogoutButton />
                </TaskMenuContext.Provider>
            </AccountContext.Provider>
        );

    const { getByText } = renderWithProviders();

    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    // TaskMenuContext methods were called
    expect(mockTaskMenuContext.setIsOpen).toHaveBeenCalledWith(false);
    expect(mockTaskMenuContext.setCurrentDate).toHaveBeenCalledWith(null);
    expect(mockTaskMenuContext.setTasks).toHaveBeenCalledWith({});

    // AccountContext methods were called
    expect(mockAccountContext.setIsLoggedIn).toHaveBeenCalledWith(false);
    expect(mockAccountContext.setUsername).toHaveBeenCalledWith(null);
    expect(mockAccountContext.setPassword).toHaveBeenCalledWith(null);
  });