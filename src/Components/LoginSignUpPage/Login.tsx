import React, { useContext, useState } from 'react';
import './Auth.css';
import { AccountContext } from './AccountContext';
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
                <div>
                    {user ? (
                        <div>
                            <JournalPageContextProvider>
                                <TaskMenuContextProvider>
                                    <MonthChangeContextProvider>
                                        {signOut && <DisplayCalendarJournal logout={signOut} />}
                                    </MonthChangeContextProvider>
                                </TaskMenuContextProvider>
                            </JournalPageContextProvider>
                        </div>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()} className="auth-form">
                            <h2>Log In</h2>
                            {alert && <AlertBanner message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
                            {/* You can optionally add custom fields here */}
                        </form>
                    )}
                </div>
            )}
        </Authenticator>
    );
};
  
  export default Login;