import React, { useEffect } from "react";
import { generateClient } from '@aws-amplify/api';
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

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

    const getJournalEntries = async () => {
      const allJournalEntries = await client.models.JournalEntry.list();
      const journalMap: Record<string, JournalEntry> = {};
      allJournalEntries.data.forEach((e: any) => {
        console.log(e)
        if (journalMap[e.date]) {
          journalMap[e.date].sections.push({name: e.name, color: e.color, text: e.entry});
        } else {
          journalMap[e.date] = {sections: [{name: e.name, color: e.color, text: e.entry}]}
        }
      });
      setJournalEntries(journalMap);
    }
  
    //get journal entries
    useEffect(() => {
      getJournalEntries();
    }, []);

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