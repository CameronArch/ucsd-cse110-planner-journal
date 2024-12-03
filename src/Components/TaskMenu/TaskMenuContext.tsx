import React, { useCallback, useState } from "react";
import { Task } from "../../Types/TaskType";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

//Create a context Type for the TaskMenu component
interface TaskMenuContextType {
    currentDate: Date | null;
    setCurrentDate: (date: Date | null) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    tasks: Record<string, Task[]>;
    setTasks: (tasks: Record<string, Task[]>) => void;
    addTask: (date: Date, task: Task) => void;
    removeTask: (date: Date, taskId: number) => void;
}

//Creates a client to use the defined schema from amplify/data/resource.ts to import backend data
const client = generateClient<Schema>();

//Create a default object for the TaskMenuContext
const initialTaskMenu: TaskMenuContextType = {
    currentDate: null,
    setCurrentDate: () => {},
    isOpen: false,
    setIsOpen: () => {},
    tasks: {},
    setTasks: () => {},
    addTask: () => {},
    removeTask: () => {},
};

//Create a context for the TaskMenu component
export const TaskMenuContext = React.createContext<TaskMenuContextType>(initialTaskMenu);

//Create a provider for the TaskMenuContext
export const TaskMenuContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [tasks, setTasks] = useState<Record<string, Task[]>>({});

    const pushTask = async (name: string, startTime: string, endTime: string, reminder: boolean, reminderTime: number, idNumber: number) => {
        await client.models.Task.create({
            name: name,
            startTime: startTime,
            endTime: endTime,
            reminder: reminder,
            reminderTime: reminderTime,
            idNumber: idNumber,
        });
    }

    const popTask = async (taskId: number) => {
        await client.models.Task.delete({ id: taskId.toString() });
    };

    const addTask = useCallback((date: Date, task: Task) => {
        const dateKey = date.toISOString().split('T')[0];
        setTasks(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), task]
        }));
        pushTask(
            task.name, 
            task.start, 
            task.end, 
            task.isReminder ? task.isReminder : false, 
            task.reminderTime? task.reminderTime : 0, 
            task.id
        );
    }, []);

    const removeTask = useCallback((date: Date, taskId: number) => {
        const dateKey = date.toISOString().split('T')[0];
        setTasks(prev => ({
            ...prev,
            [dateKey]: (prev[dateKey] || []).filter(task => task.id !== taskId)
        }));

        popTask(taskId);
    }, []);
    
    return (
        <TaskMenuContext.Provider value={{
            currentDate,
            setCurrentDate,
            isOpen,
            setIsOpen,
            tasks,
            setTasks,
            addTask,
            removeTask,
        }}>
            {children}
        </TaskMenuContext.Provider>
    );
};