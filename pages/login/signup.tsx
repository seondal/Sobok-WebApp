import moment from "moment";
import { useRouter } from "next/router";
import { postSignUp } from "../../src/api";

interface signUpProps {
  socialId: string;
  deviceToken: string;
  username: string;
}

export default function SignUp() {
  const router = useRouter();
  const { socialId, deviceToken } = router.query;

  // signUp api 연결
  async function signUp(signUpRequestBody: signUpProps) {
    const signUpResponse = await (
      await fetch(postSignUp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpRequestBody),
      })
    ).json();
    console.log(signUpResponse.data.accesstoken);
    router.push({
      pathname: "/main",
      query: {
        date: moment().format("YYYY-MM-DD"),
      },
    });
  }

  function clickToSignUp() {
    const signUpRequestBody = {
      socialId: `${socialId}`,
      username: "sss",
      deviceToken: `${deviceToken}`,
    };
    signUp(signUpRequestBody);
  }

  return (
    <div>
      추가 정보 입력 <button onClick={clickToSignUp}>가입하기</button>
    </div>
  );
}
