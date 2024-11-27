// ResetReminderButton.tsx
import React, { useState, useEffect } from 'react';
import './ResetReminderButton.css';

const ResetReminderButton: React.FC = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const checkMutedStatus = () => {
      const isMuted = localStorage.getItem('reminderMuted') === 'true';
      setMuted(isMuted);
    };

    checkMutedStatus();
    window.addEventListener('mute', checkMutedStatus); // Listen for 'mute' event
    window.addEventListener('unmute', checkMutedStatus);

    return () => {
      window.removeEventListener('mute', checkMutedStatus);
      window.removeEventListener('unmute', checkMutedStatus);
    };
  }, []);

  const handleReset = () => {
    localStorage.removeItem('reminderMuted');
    window.dispatchEvent(new Event('unmute'));
  };

  if (!muted) return null;

  return (
    <button className="reset-reminder-button" onClick={handleReset}>
      Reset Reminder
    </button>
  );
};

export default ResetReminderButton;
