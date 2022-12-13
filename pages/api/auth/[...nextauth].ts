import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
  interface Session {
    user: {
      userId?: string
      accesstoken?: String
    } & DefaultSession["user"]
  }
}

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({session, token}) {
      session.user.userId = token.sub
      session.user.accesstoken = "hahahahahahahaha"
      return session
    }
  },
});
