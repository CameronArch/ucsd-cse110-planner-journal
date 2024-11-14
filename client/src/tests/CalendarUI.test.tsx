import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarPage from './Calendar-Page';

// test CalendarPage renders title and days of the week
test('renders CalendarPage component', () => {
    render(
        <CalendarPage onLogout={() => {}} />
    );
  
    expect(screen.getByText(/PLANNER/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunday/i)).toBeInTheDocument();
    expect(screen.getByText(/Monday/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/i)).toBeInTheDocument();
});

// test logout button on CalendarPage works
test('calls onLogout when logout button is clicked', () => {
const onLogoutMock = jest.fn();

render(
    <CalendarPage onLogout={onLogoutMock} />
);

fireEvent.click(screen.getByText(/Logout/i));
expect(onLogoutMock).toHaveBeenCalled();
});