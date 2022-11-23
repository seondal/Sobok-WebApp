import Link from "next/link";
import { getScheduleDetail, socialSignIn } from "../../src/api";

interface MainProps {
  scheduleDetailData: ScheduleDetail[];
}
interface ScehduleCalendar {
  scheduleDate: Date;
  scheduleCount: number;
  isCheckCoung: number;
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

function getTodayDate() {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "-" + month + "-" + day;

  return dateString;
}

export const getServerSideProps = async () => {
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
  const accesstoken = signInData.accesstoken;

  // 날짜별 내 약 조회
  const scheduleDetailResponse = await (
    await fetch(getScheduleDetail + "?date=" + getTodayDate(), {
      method: "GET",
      headers: {
        accesstoken: accesstoken,
      },
    })
  ).json();
  const scheduleDetailData = scheduleDetailResponse.data;

  return {
    props: { scheduleDetailData },
  };
};
