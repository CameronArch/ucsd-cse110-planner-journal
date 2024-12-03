import { useContext } from "react";
import DayObject from "../DayObject/DayObject";
import { MonthChangeContext } from "../MonthChangeButton/MonthChangeContext";

const DayObjects = () => {

const {currentYear, currentMonth} = useContext(MonthChangeContext);

if (currentYear === null || currentMonth === null) {
return null;
}

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
const today = new Date();

return (
    <>
    {
    Array.from({ length: firstDayOfWeek }, (_, i) => (
    <div
    key={`placeholder-${i}`}
    className="dayObject placeholder"
    />
))}

{
Array.from({ length: daysInMonth }, (_, i) => {
const date = new Date(currentYear, currentMonth, i + 1);
const isToday =
date.getDate() === today.getDate() &&
date.getMonth() === today.getMonth() &&
date.getFullYear() === today.getFullYear();

return (
<div
key={i}
style={{

backgroundColor: isToday ? "yellow" : "#d3d3d3",
fontWeight: isToday ? "bolder" : "bold",
}}
>

<DayObject currentDate={new Date(currentYear, currentMonth, i + 1)} />

</div>
);
})}

</>
);
}
export default DayObjects;