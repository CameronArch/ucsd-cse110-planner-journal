import { useState, CSSProperties } from "react";
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
 
  const containerStyle: CSSProperties = {
    backgroundColor: "#d8d8d8",
    padding: "16px",
    borderRadius: "10px",
    width: "160px",
    boxSizing: 'border-box'
  };

  // Remove flexbox from form content to prevent spacing issues
  const formStyle: CSSProperties = {
    width: '100%',
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: '10px',
    textAlign: 'center'
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '6px',
    borderRadius: "5px",
    border: '1px solid #ccc',
    textAlign: 'center',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginBottom: '10px'
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: "#21e4e6",
    color: "black",
    width: '100%',
    borderRadius: '5px',
    padding: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginBottom: '10px'
  };

  const colorButtonStyle: CSSProperties = {
    ...buttonStyle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const colorSquareStyle: CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '2px',
    backgroundColor: hex,
    border: '1px solid rgba(0,0,0,0.1)'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#1fc4c5";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#21e4e6";
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmit} style={formStyle}>
        <label style={labelStyle}>
          Create Section
        </label>
        
        <input
          required
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          style={inputStyle}
          placeholder="Section Name"
        />

        <button
          type="button"
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
          style={colorButtonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={colorSquareStyle} />
          Select Color
        </button>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Submit
        </button>
      </form>

      {displayColorPicker && (
        <div style={{ marginTop: '10px' }}>
          <ColorPicker
            color={hex}
            onChangeColor={(newColor) => setHex(newColor)}
          />
        </div>
      )}
    </div>
  );
};

export default CreateSection;