import { useContext, useEffect } from "react";
import { DayObjectContext } from "./DayObjectContext";

export type Task = {
    id: number;
    name: string;
    start: string;
    end: string;
}

interface DayObjectProps {
    currentDate: Date;
}

//Create a DayObject component that will be used to display the tasks for that date
const DayObject = ({currentDate}: DayObjectProps) => {

    const context = useContext(DayObjectContext);

    context.setCurrentDate(currentDate);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        // try {
        //     const taskList = await fetchTasks(currentDate);
        //     context.setTasks(taskList);
        // } catch (err: any) {
        //     console.log(err.message);
        // }

        context.setTasks([
            {
                id: 1,
                name: "Task 1",
                start: "8:00 AM",
                end: "9:00 AM"
            },
            {
                id: 2,
                name: "Task 2",
                start: "9:00 AM",
                end: "10:00 AM"
            }
        ]);
    }

    return (
        <div>
            <div className="dayObject">
                <div className="dayObject__header">
                    <div className="dayObject__header__date">{currentDate.getDate()}</div>
                </div>
                <div className="dayObject__tasks">
                    <DisplayTasks/>
                </div>
                <AddTaskButton/>
                <JournalEntryButton/>
            </div>
        </div>
    );
}

export default DayObject;

//Create a button component that will be used to add a task to DayObject
const AddTaskButton = () => {
    const handleClick = () => {
        //<CreateTaskForm/>
    };

    return (
        <div>
            <button className="addTaskButton" onClick={handleClick}>+</button>
        </div>
    );
}

//Create a button component that will be used to add a journal entry to DayObject
const JournalEntryButton = () => {
    const handleClick = () => {
        //<Journal/>
    };

    return (
        <div>
            <button className="journalEntryButton" onClick={handleClick}>Journal</button>
        </div>
    );
}

//Create a component that will display the tasks for the current date
const DisplayTasks = () => {
    const context = useContext(DayObjectContext);
    
    return (
        <div>
            {context.tasks.map((task) => (
                <TaskItem task={task} />
            ))}
        </div>
    );
}

//Props for TaskItem component
interface TaskItemProps {
    task: Task;
}

//Create a component that will display a single task
const TaskItem = ({task}: TaskItemProps) => {
    const context = useContext(DayObjectContext);
    
    const handleClick = () => {
        context.setTasks(context.tasks.filter((t) => t.id !== task.id));
    }

    return (
        <div>
            <div className="taskItem">
                <div className="taskItem__name">{task.name}</div>
                <button className="taskItem__deleteButton" onClick={handleClick}>x</button>
                <div className="taskItem__description">{task.start} - {task.end}</div>
            </div>
        </div>
    );
}