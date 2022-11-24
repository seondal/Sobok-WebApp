import { getMyPillList } from "../../src/api/api";

interface MyInfoProps {
  myPillListData: Pill[];
}
interface Pill {
  color: number;
  id: number;
  pillName: string;
}

export default function MyInfo({ myPillListData }: MyInfoProps) {
  return (
    <div className="container">
      {myPillListData.map((pill) => (
        <div key={pill.id}>
          {pill.color} {pill.pillName}
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  // 내 약 리스트
  const getMyPillListResponse = await (
    await fetch(getMyPillList, {
      method: "GET",
      headers: {
        accesstoken: `${process.env.TEMP_ACCESS_TOKEN}`,
      },
    })
  ).json();
  const myPillListData = getMyPillListResponse.data;

  return {
    props: { myPillListData },
  };
};
