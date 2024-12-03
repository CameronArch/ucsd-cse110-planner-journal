import { fireEvent, render, screen } from "@testing-library/react";
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

type JournalEntriesMap = {
  [key: string]: any;
};

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

describe("Journal Page Functionality", () => {
    
    test("Return to Planner Button", () => {
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

        const returnButton = screen.getByText("Return to Planner");
        expect(returnButton).toBeInTheDocument();

        fireEvent.click(returnButton);

        expect(mockSetCurrentDate).toHaveBeenCalledWith(null);
        expect(mockSetIsOpen).toHaveBeenCalledWith(false);

    });

    test("Description Input", () => {
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

      const addSectionButton = screen.getByText("+");

      fireEvent.click(addSectionButton);

      const sectionTitleInput = screen.getByPlaceholderText("Section Name");

      fireEvent.change(sectionTitleInput, { target: { value: "Test Section" } });

      const sectionSubmitButton = screen.getByText("Submit");

      fireEvent.click(sectionSubmitButton);

      const sectionTitle = screen.getByText("Test Section");

      expect(sectionTitle).toBeInTheDocument();

      fireEvent.click(sectionTitle);

      fireEvent.change(screen.getByPlaceholderText("Write your Test Section entry here..."), { target: { value: "Test Description" } });

      expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    });
});