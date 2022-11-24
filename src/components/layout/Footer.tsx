import moment from "moment";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="container">
      <Link
        href={{
          pathname: "main",
          query: { date: moment().format("YYYY-MM-DD") },
        }}
      >
        홈
      </Link>
      <Link href="share">공유</Link>
      <Link href="notice">알림</Link>
      <Link href="addPill">약 추가</Link>
    </div>
  );
}
