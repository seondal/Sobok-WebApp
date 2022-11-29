import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <button onClick={() => signOut()}>logout</button>
      <button
        onClick={() => {
          router.push("login");
        }}
      >
        go to login
      </button>
    </>
  );
}
