import { socialSignIn } from "../../src/api";
import { signIn, signOut, useSession } from "next-auth/react";

import firebase from "firebase/app";
import "firebase/messaging";
import { useEffect } from "react";
export const firebaseConfig = {
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
  const token = await messaging.getToken({
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY,
  });

  return token;
}

export default function Login() {
  const session = useSession();

  useEffect(() => {
    async function getMessageToken() {
      const token = await getToken();
      console.log(token);
    }
    getMessageToken();
  }, []);

  const clickTosignIn = async () => {
    signIn("kakao");
    const socialId = session.data?.user.userId;

    // const signInResponse = await (
    //   await fetch(socialSignIn, {
    //     method: "GET",
    //     headers: {
    //       socialId: socialId,
    //       deviceToken: deviceToken,
    //     },
    //   })
    // ).json();
    // const signInData = signInResponse.data;
    // if (signInData.isNew) {
    //   // 회원가입
    //   router.push({
    //     pathname: "/login/signup",
    //     query: {
    //       socialId: socialId,
    //       deviceToken: deviceToken,
    //     },
    //   });
    // } else {
    //   // 로그인 성공
    //   console.log(signInData);
    // }
  };

  return (
    <>
      <div className="container">
        <button onClick={clickTosignIn}>카카오 로그인</button>
        <button onClick={() => signOut()}>Apple로 로그인</button>
      </div>
    </>
  );
}
