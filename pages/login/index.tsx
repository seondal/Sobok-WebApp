import { getSignIn } from "../../src/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APPP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export async function getToken() {
  const messaging = firebase.messaging();
  const token = await messaging.getToken();
  return token;
}

export default function Login() {
  const router = useRouter();
  const session = useSession();
  const [fcmToken, setFcmToken] = useState("");

  // deviceToken (fcmToken) 받아오기
  useEffect(() => {
    async function getMessageToken() {
      const token = await getToken();
      setFcmToken(token);
    }
    getMessageToken();
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

    if (signInData.isNew) {
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
