import { useContext, useState } from "react";
import './DayObjectStyle.css';
import { Task } from "../../Types/TaskType";
import { JournalPageContext } from "../JournalPage/JournalPageContext";
import { TaskMenuContext } from "../TaskMenu/TaskMenuContext";
import { MonthChangeContext } from "../MonthChangeButton/MonthChangeContext";
interface DayObjectProps {
    currentDate: Date;
}

//Create a DayObject component that will be used to display the tasks for that date
const DayObject = ({currentDate}: DayObjectProps) => {

    const taskMenuContext = useContext(TaskMenuContext);
    const dateKey = currentDate.toISOString().split('T')[0];
    const dayTasks = taskMenuContext.tasks[dateKey] || [];
   //const today = useState(new Date()); 
   //const day = today.getDate());

   const monthChangeContext = useContext(MonthChangeContext);
   const [selectedDate] = useState(Date()); 
   //const month  = monthChangeContext.setCurrentMonth(selectedDate.getMonth());
   //const day = monthChangeContext.setCurrentYear(selectedDate.getDate());

    if(dateKey === selectedDate as unknown)
    {
        return (
            <div>
                <div className="dayObject.today">
                    <div className="dayObject__header">
                        <div className="dayObject__header__date">{currentDate.getDate()}</div>
                    </div>
                    <div className="dayObject__tasks">
                        <DisplayTasks currentDate={currentDate} dayTasks={dayTasks}/>
                    </div>
                    <AddTaskButton currentDate={currentDate}/>
                    <JournalEntryButton currentDate={currentDate}/>
                </div>
            </div>
            
        );
    }

    else
    {
        return (
            <div>  
                <div className="dayObject">
                    <div className="dayObject__header">
                        <div className="dayObject__header__date">{currentDate.getDate()}</div>
                    </div>
                    <div className="dayObject__tasks">
                        <DisplayTasks currentDate={currentDate} dayTasks={dayTasks}/>
                    </div>
                    <AddTaskButton currentDate={currentDate}/>
                    <JournalEntryButton currentDate={currentDate}/>
                </div>
            </div>
        );
   }
  
}

export default DayObject;

//Props for AddTaskButton component
interface AddTaskButtonProps {
    currentDate: Date;
}

//Create a button component that will be used to add a task to DayObject
const AddTaskButton = ({currentDate}: AddTaskButtonProps) => {
    const taskMenuContext = useContext(TaskMenuContext);

    const handleClick = () => {
        taskMenuContext.setIsOpen(!taskMenuContext.isOpen);
        taskMenuContext.setCurrentDate(currentDate);
        
    };

    return (
        <>
            <div>
                <button className="addTaskButton" onClick={handleClick}>+</button>
            </div>
        </>
    );
}

//Props for JournalEntryButton component
interface JournalEntryButtonProps {
    currentDate: Date;
}

//Create a button component that will be used to add a journal entry to DayObject
const JournalEntryButton = ({currentDate}: JournalEntryButtonProps) => {
   /*const color = ({ isActive }: { isActive: boolean }) => {
        return(
            <JournalEntryButton = {`JournalEntryButton ${isActive ? 'active' : 'inactive'}`}>

            </JournalEntryButton>
        )
    }
*/
    //const isActive: boolean = true;
    //const className: string = `button ${isActive ? 'active' : 'inactive'}`;

    const journalPageContext = useContext(JournalPageContext);

    const handleClick = () => {
        journalPageContext.setIsOpen(true);
        journalPageContext.setCurrentDate(currentDate);
    };

    return (
    <>
        <div>
            <button className="journalEntryButton" onClick={handleClick}>Journal</button>
        </div>
    </>
    );
}

//Props for DisplayTasks component
interface DisplayTasksProps {
    dayTasks: Task[];
    currentDate: Date;
}

//Create a component that will display the tasks for the current date
const DisplayTasks = ({dayTasks, currentDate}: DisplayTasksProps) => {
    
    return (
        <div>
           {dayTasks.map((task) => (
            <TaskItem task={task} key={task.id} currentDate={currentDate}/>
            ))}
        </div>
    );
}

//Props for TaskItem component
interface TaskItemProps {
    task: Task;
    currentDate: Date;
}

//Create a component that will display a single task
const TaskItem = ({task, currentDate}: TaskItemProps) => {
    const { removeTask } = useContext(TaskMenuContext);

    return (
        <div>
            <div className="taskItem">
                <div className="taskItem__name">{task.name}</div>
                <button className="taskItem__deleteButton" onClick={() => removeTask(currentDate, task.id)} 
                        data-testid={`remove-button-task-${task.id}`}>x</button>
                <div className="taskItem__description">{task.start} - {task.end}</div>
            </div>
        </div>
    );
}