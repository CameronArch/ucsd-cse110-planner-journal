import React from "react";

interface Section {
    name: string;
    color: string;
    text?: string;
}
  
interface JournalEntry {
    sections: Section[];
}

type JournalEntriesMap = Record<string, JournalEntry>;
//Create a context Type for the JournalPage component
interface JournalPageContextType {
    currentDate: Date | null;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date | null>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    journalEntries: JournalEntriesMap;
    setJournalEntries: React.Dispatch<React.SetStateAction<JournalEntriesMap>>;
}

//Create a default object for the JournalPageContext
const initialJournalPage: JournalPageContextType = {
    currentDate: null,
    setCurrentDate: () => {},
    isOpen: false,
    setIsOpen: () => {},
    journalEntries: {},
    setJournalEntries: () => {}
};

//Create a context for the JournalPage component
export const JournalPageContext = React.createContext<JournalPageContextType>(initialJournalPage);

//Create a provider for the JournalPageContext
export const JournalPageContextProvider = (props: any) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
    const [journalEntries, setJournalEntries] = React.useState<JournalEntriesMap>({});

    return (
        <JournalPageContext.Provider 
        value={{
          currentDate, 
          setCurrentDate, 
          isOpen, 
          setIsOpen,
          journalEntries,
          setJournalEntries
        }}
      >
        {props.children}
      </JournalPageContext.Provider>
    );
}