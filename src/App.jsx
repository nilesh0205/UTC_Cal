import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const App = () => {
  const getCurrentDateWithCurrentTime = () => {
    const currentDate = new Date();
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  };

    const formatDate = (date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
  
    // Pad the month with a leading zero if it's a single digit
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${dayOfWeek}, ${dayOfMonth}/${formattedMonth}`;
  };
  
 const [currentDate, setCurrentDate] = useState(
    getCurrentDateWithCurrentTime()
  );
  const [selectedTimes, setSelectedTimes] = useState(Array(5).fill([])); // Change to 5 for Monday to Friday
  const [timezone, setTimezone] = useState("UTC");

  const getWeekDays = (startDate) => {
    const days = [];
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
    setSelectedTimes(Array(5).fill([])); // Change to 5 for Monday to Friday
  };

  const prevWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const nextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  const handleTimezoneChange = (event) => {
    const newTimezone = event.target.value;
    setTimezone(newTimezone);
  };

  const handleTimeClick = (dayIndex, time) => {
    setSelectedTimes((prevSelectedTimes) => {
      const updatedTimes = [...prevSelectedTimes];
      const currentDayTimes = [...updatedTimes[dayIndex]];
      const index = currentDayTimes.indexOf(time);
      if (index === -1) {
        // If time is not selected, add it
        currentDayTimes.push(time);
      } else {
        // If time is already selected, remove it
        currentDayTimes.splice(index, 1);
      }
      updatedTimes[dayIndex] = currentDayTimes;
      return updatedTimes;
    });
  };

  useEffect(() => {
    setSelectedTimes(Array(5).fill([])); // Change to 5 for Monday to Friday
  }, [currentDate]);

  const weekDays = getWeekDays(currentDate);

  // ... (previous code)

  return (
    <div>
      <div className="header">
        <button className="prevWeek" onClick={prevWeek}>Previous Week</button>
        <h1>{formatDate(currentDate)}</h1>
        <button className="nextWeek" onClick={nextWeek}>Next Week</button>
      </div>
      <div className="date-bar">
        <label>Select Date: </label>
        <DatePicker
          selected={currentDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </div>
      <div className="Select_Timezone">
        <label>Select Timezone: </label>
        <select className="Timezone-bar" value={timezone} onChange={handleTimezoneChange}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>
      {weekDays.map((day, dayIndex) => (
        <div key={day.toISOString()} class="row">
          <div class="col-2">
            {/* Days of Week */}
            <h2 style={{ fontSize: '20px', backgroundColor: 'whitesmoke', color: 'black', padding: '18px'  }}>{formatDate(day)}</h2>
          </div>
          {/* Time of day */}
          {day >= currentDate ? (
            <div class="col-10">
              {[
                8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14,
                14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20,
                20.5, 21, 21.5, 22, 22.5, 23,
              ].map((time) => (
                <label key={time}>
                  <input
                    className="chex-box"
                    type="checkbox"
                    checked={selectedTimes[dayIndex]?.includes(time)}
                    onChange={() => handleTimeClick(dayIndex, time)}
                  />
                  {time % 1 === 0
                    // ? `${time}:00 `
                    // : `${Math.floor(time)}:30 `}
                    ? `${time > 12 ? time - 12 : time}:00 ${time >= 12 ? 'PM' : 'AM'}`
      : `${Math.floor(time)}:30 ${time >= 12 ? 'PM' : 'AM'}`}
                </label>
              ))}
            </div>
          ) : (
            <span class="col-10">Past</span>
          )}
        </div>
      ))}
      <div>
        {/* Selected time Display */}
        {selectedTimes.flat().length > 0 && (
          <div>
            <p>Selected Times for the Week:</p>[
            {selectedTimes.flatMap((times, dayIndex) =>
              times.map((time) => (
                <div>
                  {
                     
                    
                    <div key={time}>
                    
                    {"{"} {formatDate(weekDays[dayIndex])}, Time:{" "}
                    {time % 1 === 0
                          ? `${time}:00 ${timezone}`
                          : `${Math.floor(time)}:30 ${timezone}`}  {"},"}
                  </div>
                  }
                </div>
              ))
            )}
            ]
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
