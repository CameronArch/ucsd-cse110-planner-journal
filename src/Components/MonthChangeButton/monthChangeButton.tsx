
import React, { useContext, useEffect } from "react";
import { useState } from 'react'
import { months } from "./months";
import { useDynamicYears } from "./years";
import './monthChangeButton.css'
import { MonthChangeContext } from "./MonthChangeContext";


const MonthChangeButton: React.FC = () =>{

  const monthChangeContext = useContext(MonthChangeContext);

  
  const [selectedDate, setSelectedDate] = useState(new Date(monthChangeContext.currentYear, monthChangeContext.currentMonth));

  useEffect(() => {
    monthChangeContext.setCurrentMonth(selectedDate.getMonth());
    monthChangeContext.setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate, monthChangeContext]);

  const dynamicYears = useDynamicYears({
    startingYear: 2015,
    numberOfYears: 20,
  });

  const handleMonthSelect = (e:any) => {
    
    const selectedMonth = parseInt(e.target.value, 10);
    const currentYear = selectedDate.getFullYear();
    setSelectedDate(new Date(currentYear, selectedMonth)); // Update selectedDate with the new month
  };

  


  const handleYearSelect = (e:any) => {

    const selectedYear = parseInt(e.target.value, 10);
    const currentMonth = selectedDate.getMonth();
    setSelectedDate(new Date(selectedYear, currentMonth)); // Update selectedDate with the new year
   
  };

  const increaseMonth = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    if (currentMonth === 11) { // If current month is December (11)
    
      setSelectedDate(new Date(currentYear + 1, 0)); 
    } else {
      setSelectedDate(new Date(currentYear, currentMonth + 1));  // Otherwise just increase the month
    }
  };

  const decreaseMonth = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    if (currentMonth === 0) { // If current month is January (0)
      
      setSelectedDate(new Date(currentYear - 1, 11));
    } else {
      
      setSelectedDate(new Date(currentYear, currentMonth - 1)); // Otherwise just decrease the month
    }
  };




  return (
    <div className="center">
    <div className="Table" >


       <div className="Cell">
       <div className="arrow-container" >


       <label htmlFor="left-arrow" hidden>decrease month</label>
           <button className="arrow-button left-arrow" id="left-arrow" aria-label="Decrease Month" onClick={decreaseMonth} >
        <span className="arrow" />
        </button> 

        </div>

       </div>

      
 

       <div className="Cell2">
       
      <div className="dropdown-calendar">

      <label htmlFor="month-select"><b> Select Month: </b></label>
      <select id="month-select" data-testid="month-select" onChange={handleMonthSelect} value={selectedDate.getMonth()}>

          {months.map((key, index) => (
            <option value={index} key={index}>
              {key}
            </option>
          ))}
        </select>


     
        

        
              
        
        <label htmlFor="year-select"> <b> Select Year: </b></label>
              
        <select id="year-select" data-testid="year-select" onChange={handleYearSelect} value={selectedDate.getFullYear()}>

        {dynamicYears.map((key, index) => (
            <option value={key} key={index}>
              {key}
            </option>
          ))}
        </select>

        

      </div>
      </div>

      <div className="Cell">
       <div className="arrow-container" >

       <label htmlFor="right-arrow" hidden>increase month</label>
        <button className="arrow-button right-arrow" id="right-arrow" aria-label="Increase Month" onClick={increaseMonth}>
        <span className="arrow" />
        </button>
        </div>

       </div>

       



       
    </div>
    <h1 data-testid="current-date" hidden >
        {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
      </h1>
     
      
    </div>
    
  );
}

export default MonthChangeButton;

