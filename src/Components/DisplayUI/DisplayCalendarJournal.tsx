import { useContext } from "react";
import { JournalPageContext } from "../JournalPage/JournalPageContext";
import CalendarPage from "../CalendarPage/Calendar-Page";
import JournalPage from "../JournalPage/Journal-Page";
import RemindersManager from "../ReminderPopup/RemindersManager"
import ResetReminderButton from "../ReminderPopup/ResetReminderButton";

const DisplayCalendarJournal = () => {
    const journalPageContext = useContext(JournalPageContext);

    return (
        <>
            {journalPageContext.isOpen ? 
                <JournalPage /> 
                : 
                <>
                    <RemindersManager />
                    <ResetReminderButton />
                    <CalendarPage />
                </>
                        
            }
        </>
    );
}

export default DisplayCalendarJournal;