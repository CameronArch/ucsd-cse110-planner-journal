import React, { useState, useEffect } from 'react';
import './ReminderPopup.css';

interface ReminderPopupProps {
  taskName: string;
  onClose: () => void;
}

const ReminderPopup: React.FC<ReminderPopupProps> = ({ taskName, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const checkMutedStatus = () => {
      const isMuted = localStorage.getItem('reminderMuted') === 'true';
      setMuted(isMuted);
      if (!isMuted) setVisible(true);
    };

    // Initial check
    checkMutedStatus();

    // Listen for custom 'unmute' event
    window.addEventListener('unmute', checkMutedStatus);

    return () => {
      window.removeEventListener('unmute', checkMutedStatus);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const handleMute = () => {
    localStorage.setItem('reminderMuted', 'true');
    setMuted(true);
    setVisible(false);
    window.dispatchEvent(new Event('mute'));
    onClose();
  };

  if (!visible || muted) return null;

  return (
    <div className="reminder-popup">
      <div className="reminder-popup-header">
        <span>Reminder!</span>
        <button className="close-button" onClick={handleClose}>×</button>
      </div>
      <div className="reminder-popup-content">
        <p>{taskName}</p>
      </div>
      <button className="mute-button" onClick={handleMute}>Mute</button>
    </div>
  );
};

export default ReminderPopup;
