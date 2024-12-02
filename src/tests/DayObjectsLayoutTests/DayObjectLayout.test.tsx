import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MonthChangeContext } from "../../Components/MonthChangeButton/MonthChangeContext";
import CalendarPage from "../../Components/CalendarPage/Calendar-Page";

describe("DayObject Layout HTML", () => {

  test("January Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 0,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 31; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("February (Leap) Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 1,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 29; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("February (Non-Leap) Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2023,
            setCurrentYear: jest.fn(),
            currentMonth: 1,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 28; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("March Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 2,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 31; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("April Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 3,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 30; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("May Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 4,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 31; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("June Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 5,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 30; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("July Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 6,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 31; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("August Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 7,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 30; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("September Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 8,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 30; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("October Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 9,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 31; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("November Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 10,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 30; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });

  test("December Layout", () => {
    const MockChangeMonthProvider = ({ children }: { children: React.ReactNode }) => (
        <MonthChangeContext.Provider value={{
            currentYear: 2024,
            setCurrentYear: jest.fn(),
            currentMonth: 11,
            setCurrentMonth: jest.fn(),
        }}>
            {children}
        </MonthChangeContext.Provider>
      );

    render(
        <MockChangeMonthProvider>
            <CalendarPage logout={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </MockChangeMonthProvider>
    );

    for (let i = 1; i <= 31; i++) {
        const dateElement = screen.getByText(i);
        expect(dateElement).toBeInTheDocument();
    }
   
  });
});