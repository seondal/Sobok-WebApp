import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

interface DateData {
  full: string;
  date: string;
}

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

export const MonthCalendar = ({ selected }: { selected: moment.Moment }) => {
  let date = selected.clone().startOf("month");

  let dates: DateData[] = [];

  // 1일 이전의 날짜들 처리
  for (let i = date.day(); i > 0; i--) {
    dates.unshift({ full: `${i}`, date: `none` });
  }

  // 날짜 데이터 넣기
  for (; date < selected.clone().endOf("month"); date.add(1, "day")) {
    const data: DateData = {
      full: date.format("YYYY-MM-DD"), // href 쿼리에 전달할 연도-월-날짜
      date: date.format("DD"), // 화면에 표시되는 날짜
    };
    dates = dates.concat(data);
  }

  // [주][날짜] 형태의 이중배열로 저장
  let calendar: DateData[][] = Array.from(Array(6), () => new Array(7));
  dates.forEach((date, index) => {
    calendar[Math.floor(index / 7)][index % 7] = date;
  });

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
        {calendar.map((week, index) => (
          <tr key={index}>
            {week.map((day) =>
              day.date !== "none" ? (
                <td key={day.full}>
                  <Link href={`/main?date=${day.full}`}>
                    <span>{day.date}</span>
                  </Link>
                </td>
              ) : (
                <td></td>
              )
            )}
          </tr>
        ))}
      </table>
    </div>
  );
};
