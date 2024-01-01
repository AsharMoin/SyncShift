import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userhomepage.css";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import { useParams } from "react-router-dom";

type WeeklyScheduleItem = {
  title: string;
  start?: string;
  end?: string;
  allDay: boolean;
  extendedProps: {
    isWorking: boolean;
    Hours: string;
  };
};

export default function UserHome() {
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyScheduleItem[]>([]);
  const [employeeName, setEmployeeName] = useState<string>()
  const [loading, setLoadingText] = useState<string>("Loading");
  const [fetchState, setFetchState] = useState<boolean>(false)
  const { id } = useParams()

  useEffect(() => {
    renderSchedule();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (!fetchState) {
      intervalId = setInterval(() => {
        setLoadingText((prevText) => {
          return prevText === 'Loading...' ? 'Loading' : prevText + '.';
        });
      }, 500);
    } else {
      clearInterval(intervalId); // Clear interval when fetchState is true
    }

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, [fetchState]);

  async function renderSchedule() {
    try {
      const res = await axios.get(`${id}`);
      console.log(res)
      setEmployeeName(res.data.employee.employeeName)
      setWeeklySchedule(res.data.schedule);
      setFetchState(true)
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <>
      {!fetchState ? (
        <div className="LoadingBar">{loading}</div>
      ) : (
        <>
          <h2 className="title">Work Schedules</h2>
          <div className="employee-name">{ employeeName }</div>
          <FullCalendar
            plugins={[listPlugin]}
            initialView="listWeek"
            events={[...weeklySchedule]}
            height={FullCalendar.length === undefined ? 200 : "auto"}
            eventContent={(arg) => (
              <i>
                {arg.event.title}
                <br />
                {arg.event.extendedProps.isWorking ? arg.event.extendedProps.Hours : "-"}
              </i>
            )}
            eventDidMount={(info) => {
              const eventElement = info.el;
              if (info.isToday) {
                eventElement.style.backgroundColor = "lightgray";
              }
            }}
          />
        </>
      )}
    </>
  );
}
