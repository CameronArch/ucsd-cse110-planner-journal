import { useState } from "react";
import ColorPicker from "./ColorPicker"

interface Section {
  name: string;
  color: string;
}

interface CreateSectionProps {
  onCreateSection: (section: Section) => void;
}

const CreateSection: React.FC<CreateSectionProps> = ({ onCreateSection }) => {

  const [ sectionName, setSectionName ] = useState("");
  const [ hex, setHex ] = useState("#ffffff");
  const [ displayColorPicker, setDisplayColorPicker ] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sectionName) {
      onCreateSection({ name: sectionName, color: hex });
      setSectionName("");
      setHex("#ffffff");
      setDisplayColorPicker(false);
    }
  };

  return (
    <div>
      <div 
        className="create-section" 
        style={{ 
          backgroundColor: "#d8d8d8"
        }}
      >
        <form onSubmit={(event) => onSubmit(event)}>
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems:'center', 
              gap: '10px', 
              width: '100%' 
            }}
          >
            <label>Create Section</label>
            <input
              required
              type="text"
              value={sectionName}
              onChange={(e) => {
                setSectionName(e.target.value);
              }}
              style={{
                borderRadius: "5px",
              }}
              placeholder="Section Name"
            />
            <button
              type="button"
              onClick={() => setDisplayColorPicker(!displayColorPicker)}
              style={{ 
                backgroundColor: "#21e4e6", 
                color: "black", 
                width: '80%',
                borderRadius: '5px',
                padding: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#1fc4c5"}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#21e4e6"}
            >
              Select Color
            </button>
            <button
              type="submit"
              style={{ 
                backgroundColor: "#21e4e6", 
                color: "black", 
                width: '50%',
                borderRadius: '5px',
                padding: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onClick={() => console.log({ sectionName, hex })}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#1fc4c5"}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#21e4e6"}
            >
              Submit
            </button>
          </div>
        </form>
        {displayColorPicker && (
          <ColorPicker
            color={hex}
            onChangeColor={(newColor) => setHex(newColor)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateSection;