import { fireEvent, render, screen, within } from "@testing-library/react";
import DayObject from "../../Components/DayObject/DayObject";
import '@testing-library/jest-dom';
import { TaskMenuContext } from "../../Components/TaskMenu/TaskMenuContext";
import { useCallback, useState } from "react";
import { JournalPageContext } from "../../Components/JournalPage/JournalPageContext";

describe("DayObject HTML", () => {
  test("Different Dates", () => {
    const { container: container1 } = render(<DayObject currentDate={new Date(2024, 10, 10)} />);
    const { container: container2 } = render(<DayObject currentDate={new Date(2024, 10, 11)} />);
  
    const date1 = container1.querySelector(".dayObject__header__date");
    const date2 = container2.querySelector(".dayObject__header__date");
  
    expect(date1).toHaveTextContent("10");
    expect(date2).toHaveTextContent("11");
  });

  test("No Tasks", () => {
    render(<DayObject currentDate={new Date(2024, 10, 11)}/>);
    const tasks = screen.queryAllByTestId('taskItem');
    expect(tasks.length).toBe(0);
  });

  test("AddTaskButton", () => {
    render(<DayObject currentDate={new Date(2024, 10, 11)}/>);
    const addTaskButton = screen.getByText('+');
    expect(addTaskButton).toBeInTheDocument();

   });

   test("JournalEntryButton", () => {
    render(<DayObject currentDate={new Date(2024, 10, 11)}/>);
    const journalPageButton = screen.getByText('Journal');
    expect(journalPageButton).toBeInTheDocument();
   });

   test("With Tasks", () => {
      const mockTasks = {
        "2024-11-11": [
            { id: 1, name: "Task 1", start: "10:00", end: "11:00" },
            { id: 2, name: "Task 2", start: "14:00", end: "15:00" },
            { id: 3, name: "Task 3", start: "16:00", end: "17:00" },
            { id: 4, name: "Task 4", start: "18:00", end: "19:00" },
            { id: 5, name: "Task 5", start: "20:00", end: "21:00" }
        ]
    };
    
      const MockTaskMenuProvider = ({ children }: { children: React.ReactNode }) => (
        <TaskMenuContext.Provider value={{
            currentDate: new Date(2024, 10, 11),
            setCurrentDate: jest.fn(),
            isOpen: false,
            setIsOpen: jest.fn(),
            tasks: mockTasks,
            setTasks: jest.fn(),
            addTask: jest.fn(),
            removeTask: jest.fn(),
        }}>
            {children}
        </TaskMenuContext.Provider>
      );
      render(
        <MockTaskMenuProvider>
            <DayObject currentDate={new Date(2024, 10, 11)} />
        </MockTaskMenuProvider>
      );
    
       
      const dateElement = screen.getByText("11");
      expect(dateElement).toBeInTheDocument();
    
        
      const task1 = screen.getByText("Task 1");
      const task2 = screen.getByText("Task 2");
      const task3 = screen.getByText("Task 3");
      const task4 = screen.getByText("Task 4");
      const task5 = screen.getByText("Task 5");

      expect(task1).toBeInTheDocument();
      expect(task2).toBeInTheDocument();
      expect(task3).toBeInTheDocument();
      expect(task4).toBeInTheDocument();
      expect(task5).toBeInTheDocument();
    });
});

describe("DayObject Functionality", () => {
    test("Remove Task", () => {
        const mockTasks = {
            "2024-11-11": [
                { id: 1, name: "Task 1", start: "10:00", end: "11:00" },
                { id: 2, name: "Task 2", start: "14:00", end: "15:00" },
                { id: 3, name: "Task 3", start: "16:00", end: "17:00" },
                { id: 4, name: "Task 4", start: "18:00", end: "19:00" },
                { id: 5, name: "Task 5", start: "20:00", end: "21:00" }
            ]
        };
        
        const TaskMenuProvider = ({ children }: { children: React.ReactNode }) => {
            const [tasks, setTasks] = useState<{ [key: string]: { id: number; name: string; start: string; end: string; }[] }>(mockTasks);
            
            const removeTask = useCallback((date: Date, taskId: number) => {
                const dateKey = date.toISOString().split('T')[0];
                setTasks(prev => ({
                    ...prev,
                    [dateKey]: (prev[dateKey] || []).filter(task => task.id !== taskId)
                }));
            }, []);
    
            const contextValue = {
                currentDate: new Date(2024, 10, 11),
                setCurrentDate: jest.fn(),
                isOpen: false,
                setIsOpen: jest.fn(),
                tasks,
                setTasks: jest.fn(),
                addTask: jest.fn(),
                removeTask
            };
    
            return (
                <TaskMenuContext.Provider value={contextValue}>
                    {children}
                </TaskMenuContext.Provider>
            );
        };
    
        render(
            <TaskMenuProvider>
                <DayObject currentDate={new Date(2024, 10, 11)} />
            </TaskMenuProvider>
        );
        
           
          const dateElement = screen.getByText("11");
          expect(dateElement).toBeInTheDocument();

          const removeButtonTask3 = screen.getByTestId("remove-button-task-3");
          
          fireEvent.click(removeButtonTask3);
        

          expect(screen.queryByText("Task 3")).not.toBeInTheDocument();

          const task1 = screen.getByText("Task 1");
          const task2 = screen.getByText("Task 2");
          const task4 = screen.getByText("Task 4");
          const task5 = screen.getByText("Task 5");
    
          expect(task1).toBeInTheDocument();
          expect(task2).toBeInTheDocument();
          expect(task4).toBeInTheDocument();
          expect(task5).toBeInTheDocument();
    });

    test("Show JournalPage", () => {
        const mockSetIsOpen = jest.fn();
        const mockSetCurrentDate = jest.fn();
        render(
            <JournalPageContext.Provider value={{ isOpen: false, 
                    setIsOpen: mockSetIsOpen, currentDate: null, setCurrentDate: mockSetCurrentDate, 
                    journalEntries: {}, setJournalEntries: jest.fn() }}>
                <DayObject currentDate={new Date(2024, 10, 11)} />
            </JournalPageContext.Provider>
        );

        const journalPageButton = screen.getByText("Journal");
        fireEvent.click(journalPageButton);
       
        expect(mockSetIsOpen).toHaveBeenCalledWith(true);
        expect(mockSetCurrentDate).toHaveBeenCalledWith(new Date(2024, 10, 11));
    });

    test("Add Task Button", () => {
        const mockSetIsOpen = jest.fn();
        const mockSetCurrentDate = jest.fn();
        render(
            <TaskMenuContext.Provider value={{ currentDate: null, setCurrentDate: mockSetCurrentDate, 
                    isOpen: false, setIsOpen: mockSetIsOpen, tasks: {}, 
                    setTasks: jest.fn(), addTask: jest.fn(), removeTask: jest.fn() }}>
                <DayObject currentDate={new Date(2024, 10, 11)} />
            </TaskMenuContext.Provider>
        );

        const addTaskButton = screen.getByText("+");
        fireEvent.click(addTaskButton);

        expect(mockSetIsOpen).toHaveBeenCalledWith(true);
        expect(mockSetCurrentDate).toHaveBeenCalledWith(new Date(2024, 10, 11));
    });

});