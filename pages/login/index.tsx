import { getSignIn } from "../../src/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { getFcmToken } from "../../src/firebase";

export default function Login() {
  const router = useRouter();
  const session = useSession();

  // deviceToken (fcmToken) 받아오기
  const [fcmToken, setFcmToken] = useState("");
  useEffect(() => {
    async function getDeviceToken() {
      const token = await getFcmToken();
      setFcmToken(token);
    }
    getDeviceToken();
  }, []);

  // signIn api 연결
  async function socialSignIn(socialId: string, deviceToken: string) {
    const signInResponse = await (
      await fetch(getSignIn, {
        method: "GET",
        headers: {
          socialId: socialId,
          deviceToken: deviceToken,
        },
      })
    ).json();
    const signInData = signInResponse.data;

    if (signInData && signInData.isNew) {
      // 회원가입
      router.push({
        pathname: "/login/signup",
        query: {
          socialId: socialId,
          deviceToken: deviceToken,
        },
      });
    } else {
      // 로그인 성공
      router.push({
        pathname: "/main",
        query: {
          date: moment().format("YYYY-MM-DD"),
        },
      });
    }
  }

  // 소셜로그인 완료 후 실행
  if (session.data) {
    const socialId = `Kakao@${session.data?.user.userId}`;
    const deviceToken = fcmToken;
    socialSignIn(socialId, deviceToken);
  }

  return (
    <>
      <div className="container">
        <button onClick={() => signIn("kakao")}>카카오 로그인</button>
        <button onClick={() => signOut()}>Apple로 로그인</button>
      </div>
    </>
  );
}
