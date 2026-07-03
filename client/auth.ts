import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;

      const email = user.email?.toLowerCase();
      if (!email || !adminEmail) return false;

      return email === adminEmail;
    },
    async session({ session }) {
      if (session.user?.email) {
        session.user.email = session.user.email.toLowerCase();
      }
      return session;
    },
  },
});