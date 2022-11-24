import Link from "next/link";

function getTodayDate() {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "-" + month + "-" + day;

  return dateString;
}

export default function Footer() {
  return (
    <div className="container">
      <Link href={{ pathname: "main", query: { date: getTodayDate() } }}>
        홈
      </Link>
      <Link href="share">공유</Link>
      <Link href="notice">알림</Link>
      <Link href="addPill">약 추가</Link>
    </div>
  );
}
