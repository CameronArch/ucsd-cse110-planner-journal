// ReminderSystem.test.tsx

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ReminderPopup from '../../Components/ReminderPopup/ReminderPopup';
import RemindersManager from '../../Components/ReminderPopup/RemindersManager';
import ResetReminderButton from '../../Components/ReminderPopup/ResetReminderButton';
import { TaskMenuContext } from '../../Components/TaskMenu/TaskMenuContext';
import { Task } from '../../Types/TaskType';

describe('Reminder System Components', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorage.clear();
    jest.useFakeTimers();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Define the interface within the test file
  interface MockTaskMenuContextType {
    currentDate: Date | null;
    setCurrentDate: (date: Date | null) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    tasks: Record<string, Task[]>;
    setTasks: (tasks: Record<string, Task[]>) => void;
    addTask: (date: Date, task: Task) => void;
    removeTask: (date: Date, taskId: number) => void;
  }

  // Helper function to create a mock context value
  const createMockTaskMenuContextValue = (
    overrides?: Partial<MockTaskMenuContextType>
  ): MockTaskMenuContextType => {
    return {
      currentDate: new Date(),
      setCurrentDate: jest.fn(),
      isOpen: false,
      setIsOpen: jest.fn(),
      tasks: {},
      setTasks: jest.fn(),
      addTask: jest.fn(),
      removeTask: jest.fn(),
      ...overrides,
    };
  };

  // Tests for ReminderPopup Component
  describe('ReminderPopup Component', () => {
    test('renders the popup when not muted', () => {
      const onCloseMock = jest.fn();
      const taskName = 'Test Task';
      render(<ReminderPopup taskName={taskName} onClose={onCloseMock} />);

      expect(screen.getByText('Reminder!')).toBeInTheDocument();
      expect(screen.getByText(taskName)).toBeInTheDocument();
    });

    test('clicking mute button hides the popup and sets muted in localStorage', () => {
      const onCloseMock = jest.fn();
      const taskName = 'Test Task';
      const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
      render(<ReminderPopup taskName={taskName} onClose={onCloseMock} />);

      const muteButton = screen.getByText('Mute');
      fireEvent.click(muteButton);

      // The popup should be removed from the DOM
      expect(screen.queryByText('Reminder!')).not.toBeInTheDocument();

      // 'reminderMuted' should be set to 'true' in localStorage
      expect(localStorage.getItem('reminderMuted')).toBe('true');

      // onClose should have been called
      expect(onCloseMock).toHaveBeenCalled();

      // 'mute' event should have been dispatched
      expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('mute'));
    });
  });

  // Tests for RemindersManager Component
  describe('RemindersManager Component', () => {
    const mockTasks: { [date: string]: Task[] } = {
      '2024-01-01': [
        {
          id: 1,
          name: 'Task 1',
          start: '10:00 AM',
          end: '11:00 AM',
          isReminder: true,
          reminderTime: 5, // 5 minutes before
        },
      ],
    };

    test('schedules and displays a reminder', () => {
      const now = new Date('2024-01-01T09:54:00'); // 6 minutes before task start
      jest.setSystemTime(now);

      const mockContextValue = createMockTaskMenuContextValue({ tasks: mockTasks });

      render(
        <TaskMenuContext.Provider value={mockContextValue}>
          <RemindersManager />
        </TaskMenuContext.Provider>
      );

      // Advance time by 1 minute (to 5 minutes before task start)
      act(() => {
        jest.advanceTimersByTime(60000);
      });

      // The reminder should now appear
      expect(screen.getByText('Reminder!')).toBeInTheDocument();
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    test('does not display reminder if muted', () => {
      localStorage.setItem('reminderMuted', 'true');
      const now = new Date('2024-01-01T09:54:00');
      jest.setSystemTime(now);

      const mockContextValue = createMockTaskMenuContextValue({ tasks: mockTasks });

      render(
        <TaskMenuContext.Provider value={mockContextValue}>
          <RemindersManager />
        </TaskMenuContext.Provider>
      );

      act(() => {
        jest.advanceTimersByTime(60000);
      });

      // The reminder should not appear
      expect(screen.queryByText('Reminder!')).not.toBeInTheDocument();
    });
  });

  // Tests for ResetReminderButton Component
  /*
  describe('ResetReminderButton Component', () => {
    test('renders when reminders are muted', () => {
      localStorage.setItem('reminderMuted', 'true');
      render(<ResetReminderButton />);
      expect(screen.getByText('Unmute Reminder')).toBeInTheDocument();
    });

    test('clicking the button removes reminderMuted from localStorage and dispatches unmute event', () => {
      localStorage.setItem('reminderMuted', 'true');
      const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

      render(<ResetReminderButton />);
      const button = screen.getByText('Unmute Reminder');
      fireEvent.click(button);

      // 'reminderMuted' should be removed from localStorage
      expect(localStorage.getItem('reminderMuted')).toBeNull();

      // 'unmute' event should have been dispatched
      expect(dispatchEventSpy).toHaveBeenCalledWith(new Event('unmute'));

      // The button should no longer be in the document
      expect(screen.queryByText('Unmute Reminder')).not.toBeInTheDocument();
    });
  });
  */
});
