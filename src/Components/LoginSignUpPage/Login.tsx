import React, { useState } from 'react';

import AlertBanner from './AlertBanner';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { JournalPageContextProvider } from '../JournalPage/JournalPageContext';
import DisplayCalendarJournal from '../DisplayUI/DisplayCalendarJournal';
import { MonthChangeContextProvider } from '../MonthChangeButton/MonthChangeContext';
import { TaskMenuContextProvider } from '../TaskMenu/TaskMenuContext';

const Login: React.FC = () => {
    const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

    return (
        <Authenticator>
            
            {({ signOut, user }) => (
                <div style={{height: 'fit-content', padding: '0px'}}>
                    {user ? (
                        <>
                            <JournalPageContextProvider>
                                <TaskMenuContextProvider>
                                    <MonthChangeContextProvider>
                                        {signOut && <DisplayCalendarJournal logout={signOut} />}
                                    </MonthChangeContextProvider>
                                </TaskMenuContextProvider>
                            </JournalPageContextProvider>
                            </>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()} className="auth-form">
                            <h2>Log In</h2>
                            {alert && <AlertBanner message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
                            
                        </form>
                    )}
                </div>
            )}
        </Authenticator>
    );
};
  
  export default Login;