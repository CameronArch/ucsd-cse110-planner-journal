import { useContext, useEffect } from "react";
import { JournalPageContextProvider } from "../JournalPage/JournalPageContext";
import DisplayCalendarJournal from "./DisplayCalendarJournal";
import { AccountContext } from "../LoginSignUpPage/AccountContext";
import SignUp from "../LoginSignUpPage/SignUp";
import Login from "../LoginSignUpPage/Login";
import React from "react";
import { MonthChangeContextProvider } from "../MonthChangeButton/MonthChangeContext";
import { TaskMenuContextProvider } from "../TaskMenu/TaskMenuContext";

const DisplayUI = () => {
    const accountContext = useContext(AccountContext);
    const [showSignUp, setShowSignUp] = React.useState<boolean>(false);
    
    useEffect(() => {
        
        if (!accountContext.credentials.has('Admin')) {
            accountContext.setCredentials((prev) => {
                const updatedCredentials = new Map(prev);
                updatedCredentials.set('Admin', '12345');
                return updatedCredentials;
            });
        }
    }, [accountContext]);
    
    return (
        <>
            {accountContext.isLoggedIn ? (
                <JournalPageContextProvider>
                    <TaskMenuContextProvider>
                        <MonthChangeContextProvider>
                            <DisplayCalendarJournal />
                        </MonthChangeContextProvider>
                    </TaskMenuContextProvider>
                </JournalPageContextProvider>
            ) : showSignUp ? (
                <SignUp setShowSignUp={setShowSignUp} />
            ) : (
                <Login setShowSignUp={setShowSignUp} />
            )}
        </>
    );
}

export default DisplayUI;

