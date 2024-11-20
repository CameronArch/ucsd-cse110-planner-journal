import React, { useContext, useEffect, useState, useRef } from 'react';
import { TaskMenuContext } from '../../Components/TaskMenu/TaskMenuContext';
import ReminderPopup from './ReminderPopup';
import { Task } from '../../Types/TaskType';

const RemindersManager: React.FC = () => {
  const { tasks } = useContext(TaskMenuContext);
  const [activeReminderTasks, setActiveReminderTasks] = useState<Task[]>([]);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    // Clear existing timers
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};

    const now = new Date();
    console.log('Current time:', now.toString());

    Object.entries(tasks).forEach(([dateKey, taskList]) => {
      taskList.forEach(task => {
        if (task.isReminder && task.reminderTime !== undefined) {
          const { reminderDateTime, taskDateTime } = getReminderDateTime(dateKey, task.start, task.reminderTime);
          const timeUntilReminder = reminderDateTime.getTime() - now.getTime();

          console.log(`\nTask: ${task.name}`);
          console.log('Task DateTime:', taskDateTime.toString());
          console.log('Reminder DateTime:', reminderDateTime.toString());
          console.log('Time until reminder (ms):', timeUntilReminder);

          if (timeUntilReminder > 0) {
            // Schedule future reminder
            console.log('Scheduling reminder in', timeUntilReminder / 1000, 'seconds');
            const timerId = setTimeout(() => {
              console.log(`Displaying reminder for task: ${task.name}`);
              setActiveReminderTasks(prev => [...prev, task]);
            }, timeUntilReminder);
            timersRef.current[`${dateKey}-${task.id}`] = timerId;
          } else if (now >= reminderDateTime && now <= taskDateTime) {
            // Reminder time has passed, but task hasn't started yet
            console.log('Reminder time has passed, displaying reminder immediately');
            setActiveReminderTasks(prev => [...prev, task]);
          } else {
            console.log('Reminder time has passed and task has already started or ended');
          }
        }
      });
    });

    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, [tasks]);

  const handleCloseReminder = (taskId: number) => {
    setActiveReminderTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <>
      {activeReminderTasks.map(task => (
        <ReminderPopup key={task.id} taskName={task.name} onClose={() => handleCloseReminder(task.id)} />
      ))}
    </>
  );
};

export default RemindersManager;

function getReminderDateTime(
  dateKey: string,
  startTime: string,
  reminderTime: number
): { reminderDateTime: Date; taskDateTime: Date } {
  const [year, month, day] = dateKey.split('-').map(Number);
  const [time, period] = startTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const taskDateTime = new Date(year, month - 1, day, hours, minutes);
  const reminderDateTime = new Date(taskDateTime.getTime() - reminderTime * 60 * 1000);

  console.log(`\nCalculating reminder for task starting at ${startTime}`);
  console.log('Task DateTime:', taskDateTime.toString());
  console.log('Reminder DateTime:', reminderDateTime.toString());

  return { reminderDateTime, taskDateTime };
}
