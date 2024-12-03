import { render, screen } from "@testing-library/react";
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

// test JournalPage renders title and days of the week
test('renders Journal Page component', () => {
    const mockSetCurrentDate = jest.fn();
    const mockSetIsOpen = jest.fn();
    
    const mockSetJournalEntries = jest.fn();
    const contextValue = {
        currentDate: new Date(),
        setCurrentDate: mockSetCurrentDate,
        isOpen: true,
        setIsOpen: mockSetIsOpen,
        journalEntries: {},
        setJournalEntries: mockSetJournalEntries
    };

    render(
        <JournalPageContext.Provider value={contextValue}>
            <JournalPage />
        </JournalPageContext.Provider>
    );
  
    expect(screen.getByText(/JOURNAL ENTRY/i)).toBeInTheDocument();
    expect(screen.getByText(/Notes Text Size:/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to Planner/i)).toBeInTheDocument();
});
