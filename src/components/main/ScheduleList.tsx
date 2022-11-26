import { ScheduleDetail } from "../../interface";

export default function ScheduleList({
  scheduleDetailData,
}: {
  scheduleDetailData: ScheduleDetail[];
}) {
  return (
    <div className="container">
      {scheduleDetailData.map((data) => (
        <div key={data.scheduleTime}>
          <h2>{data.scheduleTime}</h2>
          {data.scheduleList.map((d) => (
            <div key={d.scheduleId}>{d.pillName}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
