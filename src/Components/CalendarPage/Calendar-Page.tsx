import React, { useContext } from 'react';
import { TaskMenuContext } from '../TaskMenu/TaskMenuContext';
import TaskMenu from '../TaskMenu/TaskMenu';
import DisplayDayObjects from './DisplayDayObjects';
import { AccountContext } from '../LoginSignUpPage/AccountContext';
import MonthChangeButton from '../MonthChangeButton/monthChangeButton';

const CalendarPage: React.FC = () => {
    const taskMenuContext = useContext(TaskMenuContext);
    

    const dayStyle = {
        display: 'flex',
        border:'1px solid black',
        padding: '5px',
        justifyContent: 'center',
        margin: '0',
        gap: '0',
        width: 'auto',
        backgroundColor: '#78A1ED',
        fontWeight: 'bold'
    };
    
    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr 120px',
            alignItems: 'center',
            padding: '2px',
            width: '100%'
          }}>
            <div style={{ width: '120px' }}>
              <LogoutButton />
            </div>
            <h1 style={{
              textAlign: 'center',
              backgroundColor: '#D9D9D9',
              width: '500px',
              height: '40px',
              margin: '0 auto',
              borderRadius: '10px',
              fontWeight: 'normal',
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                textAlign: 'center'
              }}>
                PLANNER
              </span>
            </h1>
            <div /> {/* Spacer */}
          </div>
    
          {/* Month Navigation */}
          <div style={{ margin: '20px 0' }}>
            <div className="arrow-container">
              <MonthChangeButton />
            </div>
          </div>
    
          {/* Main Container with TaskMenu and Calendar side by side */}
          <div style={{
            display: 'flex',
            padding: '0 16px',
            gap: '16px',
            flexGrow: 1
          }}>
            {/* Task Menu */}
            {taskMenuContext.isOpen && (
              <div style={{
                width: '230px',
                flexShrink: 0
              }}>
                <TaskMenu />
              </div>
            )}
    
            {/* Calendar Grid */}
            <div style={{
              display: 'grid',
              gridTemplateRows: 'auto repeat(5, 1fr)',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              height: '600px',
              flexGrow: 1,
              marginRight: '48px'
            }}>
              {/* Day Headers */}
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div key={day} style={dayStyle}>
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              <DisplayDayObjects />
            </div>
          </div>
        </div>
      );
    };
    
    const LogoutButton = () => {
      const accountContext = useContext(AccountContext);
      const taskMenuContext = useContext(TaskMenuContext);
    
      const onLogout = () => {
        taskMenuContext.setIsOpen(false);
        taskMenuContext.setCurrentDate(null);
        taskMenuContext.setTasks({});
        accountContext.setIsLoggedIn(false);
        accountContext.setUsername(null);
        accountContext.setPassword(null);
      };
    
      return (
        <button
          onClick={onLogout}
          style={{
            width: '120px',
            height: '36px',
            backgroundColor: '#78A1ED',
            color: 'white',
            borderRadius: '6px',
            border: '1px solid transparent',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6691dd'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#78A1ED'}
        >
          Logout
        </button>
      );
    };
    
    export default CalendarPage;