import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

jest.mock('react-speech-recognition', () => ({
  useSpeechRecognition: () => ({
    listening: false,
    finalTranscript: '',
    interimTranscript: '',
    resetTranscript: jest.fn(),
  }),
  SpeechRecognition: {
    startListening: jest.fn(),
    stopListening: jest.fn(),
  },
}));

import JournalPage from "../../Components/JournalPage/Journal-Page";
import { JournalPageContext } from "../../Components/JournalPage/JournalPageContext";
import React from "react";

jest.mock('@uiw/react-color', () => ({
    Colorful: ({ color, onChange }: { color: string, onChange: (color: string) => void }) => (
      <div data-testid="mock-color-picker">
        <input 
          type="color" 
          value={color} 
          onChange={(e) => onChange(e.target.value)} 
        />
      </div>
    ),
    ColorResult: () => null
}));

const mockSetCurrentDate = jest.fn();
const mockSetIsOpen = jest.fn();

const mockSetJournalEntries = jest.fn();
const contextValue = {
    currentDate: new Date('2024-11-27'),
    setCurrentDate: mockSetCurrentDate,
    isOpen: true,
    setIsOpen: mockSetIsOpen,
    journalEntries: {
        '2024-11-27': {
            sections: [
            { name: 'Test Section', color: 'blue', text: '' },
            ],
        },
        },
    setJournalEntries: mockSetJournalEntries
};

// test font size changes 
test('changes Journal Page font size', () => {
    render(
        <JournalPageContext.Provider value={contextValue}>
            <JournalPage />
        </JournalPageContext.Provider>
    );

    // Simulate selecting a section
    const sectionButton = screen.getByTestId('section-Test Section');
    fireEvent.click(sectionButton);

    // Get the input for font size
    const fontSizeInput = screen.getByRole('spinbutton', { name: "" });
    expect(fontSizeInput).toBeInTheDocument(); // Verify that the input is rendered
    expect(fontSizeInput).toHaveValue(14); // Default font size should be 14

    // Change the font size to 20
    fireEvent.change(fontSizeInput, { target: { value: '20' } });
    expect(fontSizeInput).toHaveValue(20); // The input value should update

    // Check font size is updated
    const textarea = screen.getByPlaceholderText(/Write your Test Section entry here.../i);
    expect(textarea).toHaveStyle('font-size: 20px');
});

test('limits font size to minimum 11', () => {
    render(
      <JournalPageContext.Provider value={contextValue}>
        <JournalPage />
      </JournalPageContext.Provider>
    );

    // Get the input for font size
    const fontSizeInput = screen.getByRole('spinbutton', { name: "" });

    // Change font size to a value below the minimum
    fireEvent.change(fontSizeInput, { target: { value: '5' } });
    expect(fontSizeInput).toHaveValue(11); // Font size should be 11 anyway
});

test('limits font size to maximum 25', () => {
    render(
      <JournalPageContext.Provider value={contextValue}>
        <JournalPage />
      </JournalPageContext.Provider>
    );

    // Get the input for font size
    const fontSizeInput = screen.getByRole('spinbutton', { name: "" });

    // Change font size to a value above the maximum
    fireEvent.change(fontSizeInput, { target: { value: '30' } });
    expect(fontSizeInput).toHaveValue(25); // Font size should be 25 anyway
});