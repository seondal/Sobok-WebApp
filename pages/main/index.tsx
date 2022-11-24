import Link from "next/link";
import { getScheduleDetail, socialSignIn } from "../../src/api/api";
import Calendar from "../../src/components/main/Calendar";

interface MainProps {
  scheduleDetailData: ScheduleDetail[];
}
interface ScehduleCalendar {
  scheduleDate: Date;
  scheduleCount: number;
  isCheckCount: number;
  isComplete: string;
}
interface ScheduleDetail {
  scheduleTime: string;
  scheduleList: Schedule[];
}
interface Schedule {
  scheduleId: number;
  pillId: number;
  pillName: string;
  isCheck: boolean;
  color: number;
  stickerId: number[];
  stickerTotalCount: number;
}

export default function Main({ scheduleDetailData }: MainProps) {
  return (
    <>
      <div className="container">
        <Link href="myinfo">My Page</Link>
        <hr />
        <Calendar />
        <hr />
        {scheduleDetailData.map((data) => (
          <div key={data.scheduleTime}>
            <h2>{data.scheduleTime}</h2>
            {data.scheduleList.map((d) => (
              <div key={d.scheduleId}>{d.pillName}</div>
            ))}
          </div>
        ))}
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
        accesstoken: signInData.accesstoken,
      },
    })
  ).json();
  const scheduleDetailData = scheduleDetailResponse.data;

  return {
    props: { scheduleDetailData },
  };
};
