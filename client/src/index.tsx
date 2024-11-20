import React from 'react';
import ReactDOM from 'react-dom/client';
//import React from 'react';
import { useContext,useState } from "react";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import MonthChangeButtonSims from './Components/MonthChangeButton/monthChangeButton'

const root = ReactDOM.createRoot(
 document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
    <App/>
    

  </React.StrictMode>
);


//<React.StrictMode>
//<MonthChangeButtonSims/>
// <App/>
//</React.StrictMode>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
