import React from "react";

interface MonthChangeContextType {
    currentYear: number;
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
    currentMonth: number;
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
}

const initialMonthChange: MonthChangeContextType = {
    currentYear: 0,
    setCurrentYear: () => {},
    currentMonth: 0,
    setCurrentMonth: () => {},
};

export const MonthChangeContext = React.createContext<MonthChangeContextType>(initialMonthChange);

export const MonthChangeContextProvider = (props: any) => {
    const today = new Date();
    const initialYear = today.getFullYear();
    const initialMonth = today.getMonth();

    const [currentYear, setCurrentYear] = React.useState<number>(initialYear);
    const [currentMonth, setCurrentMonth] = React.useState<number>(initialMonth);

    return (
        <MonthChangeContext.Provider value={{currentYear, setCurrentYear, currentMonth, setCurrentMonth}}>
            {props.children}
        </MonthChangeContext.Provider>
    );
}