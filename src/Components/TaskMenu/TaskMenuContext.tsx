import React, { useCallback, useEffect, useState } from "react";
import { Task } from "../../Types/TaskType";

import { DataStore } from "@aws-amplify/datastore";

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

    const addTask = useCallback(async (date: Date, task: Omit<Task, 'id'>) => {
        const dateKey = date.toISOString().split('T')[0];
    
        // Save to Amplify
        const savedTask = await DataStore.save(
            new Task({
                ...task,
                start: task.start,
                end: task.end,
                reminderTime: task.reminderTime,
                isReminder: task.isReminder,
            })
        );
    
        // Update local state
        setTasks(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), savedTask]
        }));
    }, []);

    const removeTask = useCallback(async (date: Date, taskId: number) => {
        const dateKey = date.toISOString().split('T')[0];
    
        // Query the task to delete
        const taskToDelete = await DataStore.query(Task, taskId);
        if (taskToDelete) {
            await DataStore.delete(taskToDelete);
        }
    
        // Update local state
        setTasks(prev => ({
            ...prev,
            [dateKey]: (prev[dateKey] || []).filter(task => task.id !== taskId)
        }));
    }, []);


    useEffect(() => {
        const loadTasks = async () => {
            const allTasks = await DataStore.query(Task);
            const tasksByDate = allTasks.reduce((acc, task) => {
                const dateKey = task.start.split('T')[0];
                acc[dateKey] = acc[dateKey] ? [...acc[dateKey], task] : [task];
                return acc;
            }, {} as Record<string, Task[]>);
    
            setTasks(tasksByDate);
        };
    
        loadTasks();
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