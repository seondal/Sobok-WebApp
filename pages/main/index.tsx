import Link from "next/link";
import { getScheduleDetail } from "../../src/api";
import Calendar from "../../src/components/main/Calendar";
import ScheduleList from "../../src/components/main/ScheduleList";
import { ScheduleDetail } from "../../src/interface";

interface MainProps {
  scheduleDetailData: ScheduleDetail[];
}

export default function Main({ scheduleDetailData }: MainProps) {
  return (
    <>
      <div className="container">
        <Link href="myinfo">My Page</Link>
        <hr />
        <Calendar />
        <hr />
        <ScheduleList scheduleDetailData={scheduleDetailData} />
      </div>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  // 날짜별 내 약 조회
  const scheduleDetailResponse = await (
    await fetch(getScheduleDetail + "?date=" + context.query.date, {
      method: "GET",
      headers: {
        accesstoken: `${process.env.TEMP_ACCESS_TOKEN}`,
      },
    })
  ).json();
  const scheduleDetailData = scheduleDetailResponse.data;

  return {
    props: { scheduleDetailData },
  };
};
