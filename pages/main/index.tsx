import Link from "next/link";
import { getScheduleDetail, socialSignIn } from "../../src/api/api";
import Calendar from "../../src/components/main/Calendar";
import ScheduleList from "../../src/components/main/ScheduleList";
import { ScheduleDetail } from "../../src/interface";

export default function Main({
  scheduleDetailData,
}: {
  scheduleDetailData: ScheduleDetail[];
}) {
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
  // 로그인
  const signInResponse = await (
    await fetch(socialSignIn, {
      method: "GET",
      headers: {
        socialId: `${process.env.TEMP_SOCIAL_ID}`,
        deviceToken: `${process.env.TEMP_FCM_TOKEN}`,
      },
    })
  ).json();
  const signInData = signInResponse.data;

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
