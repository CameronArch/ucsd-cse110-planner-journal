
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MonthChangeButton from '../../Components/MonthChangeButton/monthChangeButton'
import { MonthChangeContextProvider } from '../../Components/MonthChangeButton/MonthChangeContext';


describe('MonthChangeButton Compoenent Tests', () => {

    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date(2024, 10, 15).getTime()); // default current date (Nov 15, 2024)
      });
    
      afterEach(() => {
        jest.useRealTimers();
      });

    
  test('Initial dropdown values is current month and current year', () => {
    
    render(<MonthChangeContextProvider><MonthChangeButton /></MonthChangeContextProvider>);
    
    const monthDropdown = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdown = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdown.value).toBe('10'); // check current Month is November
    expect(yearDropdown.value).toBe('2024'); // check current year is 2024

    
  });



  test('rightbutton click increases display and dropdown value', async () => {
   
    render(<MonthChangeContextProvider><MonthChangeButton /></MonthChangeContextProvider>);
     
    const monthDropdown = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdown = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdown.value).toBe('10'); // check current Month is November
    expect(yearDropdown.value).toBe('2024'); // check current year is 2024

    const increaseButton = screen.getByRole('button', { name: /increase month/i });
    fireEvent.click(increaseButton);

    const displayedDate = screen.getByTestId('current-date').textContent;
    expect(displayedDate).toBe('December 2024'); // Month increases to December

    const monthDropdownResult = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdownResult = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdownResult.value).toBe('11'); // Get current Month is December
    expect(yearDropdownResult.value).toBe('2024'); // Assume current year is 2024
  
    
  });

  test('leftbutton click decreases display and dropdown value', async () => {
    
    render(<MonthChangeContextProvider><MonthChangeButton /></MonthChangeContextProvider>);

    const monthDropdown = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdown = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdown.value).toBe('10'); // check current Month is November
    expect(yearDropdown.value).toBe('2024'); // check current year is 2024

    const decreaseButton = screen.getByRole('button', { name: /decrease month/i });
    fireEvent.click(decreaseButton);

    const displayedDate = screen.getByTestId('current-date').textContent;
    expect(displayedDate).toBe('October 2024'); // Month decreases to October

    const monthDropdownResult = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdownResult = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdownResult.value).toBe('9'); // Get current Month is October
    expect(yearDropdownResult.value).toBe('2024'); // Assume current year is 2024
  
      });


  test('December month increase resets month and increases year', () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 11, 15).getTime()); // Set mock current date (Dec 15, 2024)
    render(<MonthChangeContextProvider><MonthChangeButton /></MonthChangeContextProvider>);

    const monthDropdown = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdown = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdown.value).toBe('11'); // check current Month is December
    expect(yearDropdown.value).toBe('2024'); // check current year is 2024

    const increaseButton = screen.getByRole('button', { name: /increase month/i });
    fireEvent.click(increaseButton);

    const displayedDate = screen.getByTestId('current-date').textContent;
    expect(displayedDate).toBe('January 2025'); // Year changes to 2025
  });

  test('changes to previous year when decrease month from January', () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 0, 15).getTime()); // Set mock current date (Jan 15, 2024)
    render(<MonthChangeContextProvider><MonthChangeButton /></MonthChangeContextProvider>);

    const monthDropdown = screen.getByTestId(/month-select/i) as HTMLSelectElement;
    const yearDropdown = screen.getByTestId(/year-select/i) as HTMLSelectElement;
    expect(monthDropdown.value).toBe('0'); // check current Month is January
    expect(yearDropdown.value).toBe('2024'); // check current year is 2024
    
    const decreaseButton = screen.getByRole('button', { name: /decrease month/i });
    fireEvent.click(decreaseButton);

    const displayedDate = screen.getByTestId('current-date').textContent;
    expect(displayedDate).toBe('December 2023'); // Year changes to 2023
  });



  

}  )
