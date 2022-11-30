import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFcmToken } from "../../src/firebase";

export default function Setting() {
  const session = useSession();
  const router = useRouter();

  // deviceToken (fcmToken) 받아오기
  const [deviceToken, setDeviceToken] = useState("");
  useEffect(() => {
    async function getDeviceToken() {
      const token = await getFcmToken();
      setDeviceToken(token);
    }
    getDeviceToken();
  }, []);

  // 로그아웃 완료 후 화면 이동
  useEffect(() => {
    if (!session.data) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="container">
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
}
