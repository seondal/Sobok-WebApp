import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Setting() {
  const session = useSession();
  const router = useRouter();
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
