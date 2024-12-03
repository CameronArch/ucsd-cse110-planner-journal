import React, { useCallback, useEffect, useState } from "react";
import { Task } from "../../Types/TaskType";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
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

//Creates a client to use the defined schema from amplify/data/resource.ts to import backend data
const client = generateClient<Schema>();

console.log(client);

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

    const fetchTasks = async () => {
        const allTasks = await client.models.Task.list();
        console.log(allTasks);
        // TODO: parse tasks and place in tasks
        const taskMap: Record<string, Task[]> = {};
        allTasks.data.forEach((task: any) => {
            taskMap[task.date] = [...(taskMap[task.date] || []), {...task, start: task.startTime, end: task.endTime}];
        });
        setTasks(taskMap);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = useCallback(async (date: Date, task: Task) => {
        const dateKey = date.toISOString().split('T')[0];
        setTasks(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), task]
        }));
        const test = await client.models.Task.create({
            name: task.name,
            startTime: task.start,
            endTime: task.end,
            reminder: task.isReminder,
            reminderTime: task.reminderTime,
            idNumber: task.id,
            date: dateKey,
        });
        console.log(test);
    }, []);

    const removeTask = useCallback(async (date: Date, taskId: number) => {
        const dateKey = date.toISOString().split('T')[0];
        setTasks(prev => ({
            ...prev,
            [dateKey]: (prev[dateKey] || []).filter(task => task.id !== taskId)
        }));

        await client.models.Task.delete({ id: taskId.toString() });
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