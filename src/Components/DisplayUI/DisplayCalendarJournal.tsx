import { useContext } from "react";
import { JournalPageContext } from "../JournalPage/JournalPageContext";
import CalendarPage from "../CalendarPage/Calendar-Page";
import JournalPage from "../JournalPage/Journal-Page";
import RemindersManager from "../ReminderPopup/RemindersManager"
import ResetReminderButton from "../ReminderPopup/ResetReminderButton";

interface DisplayCalendarJournalProps {
    logout: () => void;
}

const DisplayCalendarJournal = ({ logout }: DisplayCalendarJournalProps) => {
    const journalPageContext = useContext(JournalPageContext);

    return (
        <>
            {journalPageContext.isOpen ? 
                <JournalPage /> 
                : 
                <>
                    <RemindersManager />
                    <ResetReminderButton />
                    <CalendarPage logout={logout}/>
                </>
                        
            }
        </>
    );
}

export default DisplayCalendarJournal;