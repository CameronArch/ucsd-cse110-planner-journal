import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarPage from "../../Components/CalendarPage/Calendar-Page";

// test CalendarPage renders title and days of the week
test('renders CalendarPage component', () => {
    render(
        <CalendarPage logout={() => {}} />
    );
  
    expect(screen.getByText(/PLANNER/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunday/i)).toBeInTheDocument();
    expect(screen.getByText(/Monday/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});
