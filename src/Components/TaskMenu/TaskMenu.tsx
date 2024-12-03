import React, { useContext, useState } from "react";
import "./TaskMenu.css";
import { TaskMenuContext } from "./TaskMenuContext";
import { Task } from "../../Types/TaskType";

const TaskMenu: React.FC = () => {

  const taskMenuContext = useContext(TaskMenuContext);

  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [isReminder, setIsReminder] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName || !startTime || !endTime) {
      alert("Please fill out all fields: Task Name, Start Time, and End Time.");
      return;
    }

    if (!taskMenuContext.currentDate) {
        console.error("Current date is null");
        return;
    }

    const newTask: Task = { 
        id: taskMenuContext.tasks[taskMenuContext.currentDate.toISOString().split('T')[0]]?.length + 1 || 1,
        name: taskName,
        start: convertTo12HourFormat(startTime),
        end: convertTo12HourFormat(endTime),
        isReminder: isReminder,
        reminderTime: isReminder ? Number(reminderTime) : undefined,
    };

    if (taskMenuContext.currentDate) {
      taskMenuContext.addTask(taskMenuContext.currentDate, newTask);
    } else {
      console.error("Current date is null");
    }

    setTaskName("");
    setStartTime("");
    setEndTime("");
    setReminderTime("");
    setIsReminder(false);

    taskMenuContext.setCurrentDate(null);
    taskMenuContext.setIsOpen(false);
  };

  return (
    <div className="task-menu-container">
      <h1 className="task-menu-title">Create Task/Event</h1>
      <form className="task-menu-form" onSubmit={handleSubmit}>
      <div className="task-menu-label">Date: {taskMenuContext.currentDate?.toDateString()}  
        </div>
        <label className="task-menu-label" htmlFor="name">
          Task Name
        </label>
        <input
          id="name"
          className="task-menu-input"
          type="text"
          data-testid="task-name-input"  
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label className="task-menu-label" htmlFor="start">
          Task Start Time
        </label>
        <input
          id="start"
          className="task-menu-input"
          type="time"
          data-testid="task-start-time-input"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className="task-menu-label" htmlFor="end">
          Task End Time
        </label>
        <input
          id="end"
          className="task-menu-input"
          type="time"
          data-testid="task-end-time-input"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="reminder-section">
          <label className="task-menu-label" htmlFor="reminder">
            Reminder Time
          </label>
          <div className="checkbox-icon">
            <input
              type="checkbox"
              checked={isReminder}
              onChange={() => setIsReminder(!isReminder)}
            />
          </div>
          <select
            id="reminder"
            className="task-menu-select"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}>
            <option value="">Select time</option>
            <option value="5">5 minutes before</option>
            <option value="10">10 minutes before</option>
            <option value="30">30 minutes before</option>
          </select>
        </div>

        <button type="submit" className="submit-button" data-testid="task-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskMenu;

//Convert 24-hour time to 12-hour time
const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    let period = "AM";
    let convertedHours = hours;

    if (hours === 0) {
        convertedHours = 12; // 00:xx should be 12:xx AM
    } else if (hours === 12) {
        period = "PM"; // 12:xx should be 12:xx PM
    } else if (hours > 12) {
        convertedHours = hours - 12; // Convert to PM
        period = "PM";
    }

    // Format hours and minutes to ensure two digits for minutes and hours
    return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};