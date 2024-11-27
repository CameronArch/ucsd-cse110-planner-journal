import React, { useContext } from 'react';
import { useState } from "react";
import CreateSection from "./Create-Section" 
import { JournalPageContext } from './JournalPageContext';

interface Section {
  name: string;
  color: string;
}

const JournalPage: React.FC = () => {
  
  const journalPageContext = useContext(JournalPageContext);

  let [ sections, setSections ] = useState<Section[]>([]);
  const [ displayCreateSection, setDisplayCreateSection ] = useState(false);
  const [ textSize, setTextSize ] = useState(14);
  const [ sectionSelection, setSectionSelection ] = useState<String>();
  const [ journalContent, setJournalContent ] = useState("");

  const handleAddSection = (newSection: Section) => {
    setSections([...sections, newSection]);
    setDisplayCreateSection(false);
  }

  const handleChangeTextSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextSize(Number(e.target.value));
  };

  const handleSectionSelection = (section: Section) => {
    setSectionSelection(section.name);
  };

  const handleReturn = () => {
    journalPageContext.setIsOpen(false);
    journalPageContext.setCurrentDate(null);
  };

  const handleJournalSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log("submitted");
  };

  return (
    <div style={{ 
      backgroundColor: "white", 
      color: "black",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>

    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      marginBottom: '20px'
    }}>

      <button style={{
        backgroundColor: "#21e4e6", 
        color: "black",
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none'
      }}
      onClick={handleReturn}
      >
        Return to Planner
      </button>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        width: '100%'
      }}>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: "#d8d8d8",
          borderRadius: '20px',
          padding: '10px 20px',
          width: "40%"
        }}>
          <h1 style={{ 
            fontSize: '20px',
            fontWeight: 'normal',
            margin: 0,
          }}>
            Journal Entry
          </h1>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          backgroundColor: '#d8d8d8',
          borderRadius: '20px',
          padding: '10px 20px',
          width: '80%'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'normal',
            margin: 0,
          }}>
            Notes Text Size: 
          </h3>
          <select value={textSize} onChange={handleChangeTextSize}>
            <option value={12}>12</option>
            <option value={14}>14</option>
            <option value={16}>16</option>
            <option value={18}>18</option>
          </select>
        </div>
      </div>
    </div>

      <div style={{
        display: 'flex',
        width: '90vw',
        height: '90vw',
        gap: '1%'
      }}>
        
        {displayCreateSection && (
          <div style={{
            display: 'flex',
            height: '20%',
            backgroundColor: "#d8d8d8", 
            borderRadius: '10px',
            padding: '10px',
            boxSizing: 'border-box',
            position: 'relative'
          }}>

            <div style={{ 
              display: 'flex',       
            }}>
              <CreateSection
                onCreateSection={handleAddSection} 
              />
            </div>
          </div>
        )}
          
        <div style={{ 
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: "#d8d8d8", 
          borderRadius: '10px',
          padding: '20px',
          boxSizing: 'border-box',
          position: 'relative',
        }}>

        <div style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginRight: '20px'
        }}>
            
          <button style={{
            backgroundColor: '#21e4e6',
            color: 'black',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            width: '20%',
          }}
          onClick={() => setDisplayCreateSection(!displayCreateSection)}
          >
            +
          </button>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10ox',
              borderRadius: '5px'
            }}>

              {sections.map((section, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: section.color,
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                  onClick={() => handleSectionSelection(section)}
                >
                  {section.name}
                  </div>
              ))}
            </div>
          </div>
          <div style={{
            fontSize: textSize
          }}>
            {sectionSelection}
          </div>
          <div>
            <form onSubmit={(event) => handleJournalSubmission(event)}>
              <input
                type="text"
                value={journalContent}
                onChange={(e) => {
                  setJournalContent(e.target.value);
                }}
                style={{
                  width: '60vw',
                  height: '60vh',
                  borderRadius: "5px",
                }}
                placeholder="What's on your mind?"
              />
              <button
              type="submit"
              style={{ 
                backgroundColor: "#21e4e6", 
                color: "black", 
                width: '50%',
                borderRadius: '5px',
              }}
              onClick={() => console.log("clicked submit")}
            >
              Submit
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;