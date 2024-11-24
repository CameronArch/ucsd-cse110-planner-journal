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
  const [ sectionSelection, setSectionSelection ] = useState<String>()

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

  function ReturnPlanner() {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <button
        style={{
          backgroundColor: isHovered ? "#1fc4c5" : "#21e4e6", // Change color on hover
          color: "black",
          padding: '10px 15px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleReturn}
        onMouseEnter={() => setIsHovered(true)} // Hover starts
        onMouseLeave={() => setIsHovered(false)} // Hover ends
      >
        Return to Planner
      </button>
    );
  }

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

      <ReturnPlanner/>

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
            
            <button
                style={{
                backgroundColor: '#21e4e6',
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                width: '20%',
                fontSize: '24px', 
                fontWeight: 'bold',
                textAlign: 'center', 
                lineHeight: '1', 
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease', 
            }}
                onClick={() => setDisplayCreateSection(!displayCreateSection)}
                onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#1fc4c5'; 
                    (e.target as HTMLButtonElement).style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#21e4e6';
                    (e.target as HTMLButtonElement).style.transform = 'scale(1)';
                }}
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
        </div>
      </div>
    </div>
  );
};

export default JournalPage;