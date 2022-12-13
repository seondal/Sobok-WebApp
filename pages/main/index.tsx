import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { getScheduleDetail } from "../../src/api";
import Calendar from "../../src/components/main/Calendar";
import ScheduleList from "../../src/components/main/ScheduleList";
import { ScheduleDetail } from "../../src/interface";
import { authOptions } from "../api/auth/[...nextauth]";

interface MainProps {
  scheduleDetailData: ScheduleDetail[];
  session: any;
}

export default function Main({ scheduleDetailData, session }: MainProps) {
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
  const session = getSession();
  console.log(
    "🚀 ~ file: index.tsx:33 ~ getServerSideProps ~ session",
    session
  );
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
    props: {
      scheduleDetailData,
    },
  };
};
