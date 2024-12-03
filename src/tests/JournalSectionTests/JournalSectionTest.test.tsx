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
import CreateSection from '../../Components/JournalPage/Create-Section';
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

describe("Section test", () => {
   // /*
    test("Section Form Submission", () => {
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

        //Find and click add button
        const SectionButton = screen.getByText("+");
        fireEvent.click(SectionButton);

        //Filling Form out
        const defaultTitle = screen.getByPlaceholderText("Section Name");
        fireEvent.change(defaultTitle, { target: { value: "Test Title Section" } });

        const selectColor = screen.getByText("Select Color");
        fireEvent.click(selectColor);
        fireEvent.change(selectColor, { target: { value: "#ffffff" } });

        const SubmitButton = screen.getByText("Submit");
        fireEvent.click(SubmitButton);

        //check Title value
        const sectionTitle = screen.getByText("Test Title Section");
        expect(sectionTitle).toBeInTheDocument();

        //click on Section and write in text box, verify text is present
        fireEvent.click(sectionTitle);
        fireEvent.change(screen.getByPlaceholderText("Write your Test Title Section entry here..."), { target: { value: "Test Journaling" } });
        expect(screen.getByDisplayValue("Test Journaling")).toBeInTheDocument();

        
    });

//*/

    test("Section Change When Clicked on", () => {
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
        
      //Create Section 1
      //Find and click add button
      const SectionButton = screen.getByText("+");
      fireEvent.click(SectionButton);

      const defaultTitle = screen.getByPlaceholderText("Section Name");
      fireEvent.change(defaultTitle, { target: { value: "Section 1" } });

      const selectColor1 = screen.getByText("Select Color");
      fireEvent.click(selectColor1);
      fireEvent.change(selectColor1, { target: { value: "#ffffff" } });

      const SubmitButton = screen.getByText("Submit");
      fireEvent.click(SubmitButton);

      //check Title value
      const SectionTitle1 = screen.getByText("Section 1");
      expect(SectionTitle1).toBeInTheDocument();

       //click on Section 1 and write in text box, verify text is present
      fireEvent.click(SectionTitle1);
      fireEvent.change(screen.getByPlaceholderText("Write your Section 1 entry here..."), { target: { value: "Journaling Section 1" } });
      expect(screen.getByDisplayValue("Journaling Section 1")).toBeInTheDocument();
    
      //Create Section 2
      //Find and click add button
      const SectionButton2 = screen.getByText("+");
      fireEvent.click(SectionButton2);

      const defaultTitle2 = screen.getByPlaceholderText("Section Name");
      fireEvent.change(defaultTitle2, { target: { value: "Section 2" } });

      const selectColor2 = screen.getByText("Select Color");
      fireEvent.click(selectColor2);
      fireEvent.change(selectColor2, { target: { value: "#ffffff" } });

      const sectionSubmitButton = screen.getByText("Submit");
      fireEvent.click(sectionSubmitButton);

      //check Title value
      const SectionTitle2 = screen.getByText("Section 2");
      expect(SectionTitle2).toBeInTheDocument();

       //click on Section 2 and write in text box, verify text is present
      fireEvent.click(SectionTitle2);
      fireEvent.change(screen.getByPlaceholderText("Write your Section 2 entry here..."), { target: { value: "Journaling Section 2" } });
      expect(screen.getByDisplayValue("Journaling Section 2")).toBeInTheDocument();

      //Return to section 1 to check if text and section still exists
      expect(SectionTitle1).toBeInTheDocument();
      fireEvent.click(SectionTitle1);
      expect(screen.getByDisplayValue("Journaling Section 1")).toBeInTheDocument();
    });

    
    test("Error Message When Section Name is Empty", () => {
      const mockOnCreateSection = jest.fn();
  
      render(<CreateSection onCreateSection={mockOnCreateSection} />);

      // Submit without entering a section name
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
  
      // Verify onCreateSection is not called
      expect(mockOnCreateSection).not.toHaveBeenCalled();
    });

});
