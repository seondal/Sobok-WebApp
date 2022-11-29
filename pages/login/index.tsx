import firebase from "firebase/app";
import "firebase/messaging";
import { useRouter } from "next/router";
import { socialSignIn } from "../../src/api/api";
import { getAuthCode } from "../../src/api/kakaoApi";
// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APPP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};

const signInKakao = async (socialId: string, deviceToken: string) => {
  // 로그인
  const signInResponse = await (
    await fetch(socialSignIn, {
      method: "GET",
      headers: {
        socialId: socialId,
        deviceToken: deviceToken,
      },
    })
  ).json();
  const signInData = signInResponse.data;
  console.log(signInData);
};

const getFcmToken = () => {
  if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const firebaseMessaging = firebaseApp.messaging();
    firebaseMessaging
      .requestPermission()
      .then(() => {
        return firebaseMessaging.getToken(); // 등록 토큰 받기
      })
      .then(function (token) {
        console.log(token);
        return token;
      })
      .catch(function (error) {
        console.log("FCM Error : ", error);
      });
  }
};

export default function Login() {
  const { query } = useRouter();

  if (typeof query.code === "string") {
    signInKakao(query.code, `${getFcmToken()}`);
  }

  return (
    <>
      <div className="container">
        <a href={getAuthCode}>카카오 로그인</a>
        <button>Apple로 로그인</button>
      </div>
    </>
  );
}
