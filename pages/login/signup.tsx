import { useRouter } from "next/router";
import { socialSignUp } from "../../src/api";

interface signUpProps {
  socialId: string;
  deviceToken: string;
  email: string;
  username: string;
}

export default function SignUp() {
  const router = useRouter();
  const { socialId, deviceToken } = router.query;

  const signUp = async ({
    socialId,
    deviceToken,
    email,
    username,
  }: signUpProps) => {
    const signUpResponse = await (
      await fetch(socialSignUp, {
        method: "POST",
      })
    ).json();
    const signUpData = signUpResponse.data;
    console.log(signUpData);
  };

  function clickToSignUp() {
    const signUpBody = {
      socialId: `${socialId}`,
      deviceToken: `${deviceToken}`,
      email: "www",
      username: "sss",
    };
    signUp(signUpBody);
  }

  return (
    <div>
      추가 정보 입력 <button onClick={clickToSignUp}>가입하기</button>
    </div>
  );
}
