import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

export const MonthCalendar = ({ selected }: any) => {
  let calendar: any[] = [];

  let date = selected.clone().startOf("month");

  for (let i = 0; i < selected.clone().endOf("month").date(); i++) {
    const data = {
      full: date.format("YYYY-MM-DD"),
      date: date.format("DD"),
      day: date.day(),
    };
    calendar = calendar.concat(data);
    date.add(1, "day");
  }

  return (
    <div>
      <table border={1}>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <tr>
          {calendar.map((day) => (
            <td key={day.full}>
              <Link href={`/main?date=${day.full}`}>
                <span>{day.date}</span>
              </Link>
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default function Calendar() {
  const [selected, setSelected] = useState(moment());

  function moveNextMonth() {
    setSelected(selected.clone().add(1, "month"));
  }
  function movePrevMonth() {
    setSelected(selected.clone().subtract(1, "month"));
  }

  return (
    <div className="container">
      <div className="header">
        <button onClick={movePrevMonth}>이전달</button>
        <span>{selected.format("MM월")}</span>
        <button onClick={moveNextMonth}>다음달</button>
        <MonthCalendar selected={selected} />
      </div>
    </div>
  );
}
