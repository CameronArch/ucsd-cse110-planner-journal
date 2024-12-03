import React, { useContext, useEffect } from 'react';
import { useState } from "react";
import CreateSection from "./Create-Section" 
import { JournalPageContext } from './JournalPageContext';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';

const micImage = '/MicImage.png';

interface Section {
  name: string;
  color: string;
  text?: string;
}

const JournalPage: React.FC = () => {
  const { 
    currentDate, 
    setCurrentDate,
    setIsOpen, 
    journalEntries, 
    setJournalEntries 
  } = useContext(JournalPageContext);

  const [displayCreateSection, setDisplayCreateSection] = useState(false);
  const [textSize, setTextSize] = useState(14);
  const [sectionSelection, setSectionSelection] = useState<Section | null>(null);
  const [currentSections, setCurrentSections] = useState<Section[]>([]);
  const [isRecording, setIsRecording] = useState(false); // Added for mic button
  const [isNewRecording, setIsNewRecording] = useState(false); // Used for tracking capitalization


  //SpeechRecognition
  const {
    listening,
    finalTranscript,
    resetTranscript,
  } = useSpeechRecognition({clearTranscriptOnListen: false});

  const [prevFinalTranscript, setPrevFinalTranscript] = useState('');

  //Appends newly spoken text to previous text
  useEffect(() => {
    if (sectionSelection && finalTranscript !== prevFinalTranscript) {
      let newTranscript = finalTranscript.replace(prevFinalTranscript, '');
      if (newTranscript) {
        if (isNewRecording) {
          // Capitalize the first letter
          newTranscript = newTranscript.charAt(0).toUpperCase() + newTranscript.slice(1);
          setIsNewRecording(false); 
        }
        const updatedText = (sectionSelection.text || '') + ' ' + newTranscript + '.';
        handleTextChange(updatedText);
        setPrevFinalTranscript(finalTranscript);
      }
    }
  }, [finalTranscript, sectionSelection, prevFinalTranscript]);

  useEffect(() => {
    if (!listening) {
      setIsRecording(false);
    }
  }, [listening]);

  useEffect(() => {
    if (currentDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingEntry = journalEntries[dateString];
      
      if (existingEntry) {
        setCurrentSections(existingEntry.sections);
      } else {
        
        setCurrentSections([]);
        setJournalEntries({
          ...journalEntries,
          [dateString]: { sections: [] }
        });
      }
    }
  }, [currentDate, journalEntries, setJournalEntries]);
  
  const handleAddSection = (newSection: Section) => {
    if (!currentDate) return;

    const dateString = currentDate.toISOString().split('T')[0];
    const updatedSections = [...currentSections, { ...newSection, text: '' }];
    
    setCurrentSections(updatedSections);
    
    
    setJournalEntries({
      ...journalEntries,
      [dateString]: { sections: updatedSections }
    });
    
    setDisplayCreateSection(false);
  };

  const handleChangeTextSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value);
  
    if (numericValue < 11) {
      return setTextSize(11);
    }
    if (numericValue > 25) {
      return setTextSize(25);
    }
  
    setTextSize(numericValue);
  };


  const handleMicClick = () => {
    if (!sectionSelection) {
      alert('Please select a section before recording.');
      return;
    }
    if (isRecording) {
      SpeechRecognition.stopListening();
    } else {
      //Empties queue of current transcripts and starts new recording
      setPrevFinalTranscript(''); 
      resetTranscript();
      setIsNewRecording(true);
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    }
    setIsRecording((prev) => !prev);
    };

  const handleSectionSelection = (section: Section) => {
    setSectionSelection(section);
  };


  const handleTextChange = (text: string) => {
    if (!currentDate || !sectionSelection) return;

    const dateString = currentDate.toISOString().split('T')[0];
    const updatedSections = currentSections.map(section => 
      section.name === sectionSelection.name 
        ? { ...section, text } 
        : section
    );

    setCurrentSections(updatedSections);
    setSectionSelection({ ...sectionSelection, text });

    setJournalEntries({
      ...journalEntries,
      [dateString]: { sections: updatedSections }
    });
  };

  const handleReturn = () => {
    setIsOpen(false);
    setCurrentDate(null);
  };

  function ReturnPlanner() {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <button
        style={{
          backgroundColor: isHovered ? "#1fc4c5" : "#21e4e6",
          color: "black",
          padding: '10px 15px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleReturn}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
              fontWeight: 'Bold',
              margin: 0,
            }}>
              JOURNAL ENTRY: {currentDate?.toDateString()} 
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
            <input
              type="number"
              value={textSize}
              onChange={handleChangeTextSize}
              min={11}
              max={25}
              />

              {/* Mic Button */}
            <button
            onClick={handleMicClick}
            style={{
              backgroundColor: isRecording ? 'red' : 'green',
              border: 'none',
              borderRadius: '50%',
              marginLeft: '10px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'background-color 0.3s ease',
            }}
          >
            <img
              src={micImage}
              alt="Mic"
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
              }}
            />
          </button>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        width: '90vw',
        height: '90vh',
        gap: '1%'
      }}>
        {displayCreateSection && (
          <div style={{
            display: 'flex',
            height: 'fit-content',
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
              padding: '10px',
              borderRadius: '5px'
            }}>
              {currentSections.map((section, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: section.color,
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    border: sectionSelection?.name === section.name ? '2px solid #21e4e6' : 'none'
                  }}
                  onClick={() => handleSectionSelection(section)}
                  data-testid={`section-${section.name}`}
                >
                  {section.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {sectionSelection ? (
              <>
                <div style={{
                  fontSize: textSize,
                  fontWeight: 'bold',
                  color: 'black',
                  backgroundColor: sectionSelection.color,
                  padding: '10px',
                  borderRadius: '5px',
                  width: 'fit-content'
                }}>
                  {sectionSelection.name}
                </div>
                <textarea
                  value={sectionSelection.text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    fontSize: `${textSize}px`,
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    resize: 'none',
                    backgroundColor: 'white',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                  placeholder={`Write your ${sectionSelection.name} entry here...`}
                />
              </>
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '18px',
                color: '#666',
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '20px'
              }}>
                Create/Select Section to Write Entry
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;