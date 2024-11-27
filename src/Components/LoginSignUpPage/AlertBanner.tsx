import React from 'react';

interface AlertBannerProps {
  message: string;
  onClose: () => void;
  type: 'error' | 'success';
}

const AlertBanner: React.FC<AlertBannerProps> = ({ message, onClose, type }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bannerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: type === 'error' ? '#dc2626' : '#16a34a',
    color: 'white',
    padding: '16px',
    textAlign: 'center',
    fontSize: '1.125rem',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1000,
    animation: 'slideDown 0.3s ease-out'
  };

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideDown {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={bannerStyles}>
      {message}
    </div>
  );
};

export default AlertBanner;