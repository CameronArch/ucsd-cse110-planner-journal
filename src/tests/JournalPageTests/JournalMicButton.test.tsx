import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import JournalPage from "../../Components/JournalPage/Journal-Page";
import { JournalPageContext } from "../../Components/JournalPage/JournalPageContext";

describe("Mic Button Functionality", () => {
  const mockSetCurrentDate = jest.fn();
  const mockSetIsOpen = jest.fn();
  const mockSetJournalEntries = jest.fn();

  const contextValue = {
    currentDate: new Date(),
    setCurrentDate: mockSetCurrentDate,
    isOpen: true,
    setIsOpen: mockSetIsOpen,
    journalEntries: {},
    setJournalEntries: mockSetJournalEntries,
  };

  test("renders the mic button and toggles its state", () => {
    render(
      <JournalPageContext.Provider value={contextValue}>
        <JournalPage />
      </JournalPageContext.Provider>
    );
    //mic button
    const micButton = screen.getByRole("button", { name: /Mic/i });
    expect(micButton).toBeInTheDocument();

    //mic image png
    const micImage = screen.getByAltText("Mic");
    expect(micImage).toBeInTheDocument();
    expect(micImage).toHaveAttribute("src", "/MicImage.png");

    // button should be green
    expect(micButton).toHaveStyle("background-color: green");

    //button should be red when clicked
    fireEvent.click(micButton);
    expect(micButton).toHaveStyle("background-color: red");

    //button should go back to green when clicked
    fireEvent.click(micButton);
    expect(micButton).toHaveStyle("background-color: green");
  });
});
