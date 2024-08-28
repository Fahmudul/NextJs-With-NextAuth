import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/Database/dbConfig";
import Users from "@/Models/userModel";
import bcryptjs from "bcryptjs";
import GitHubProvider from "next-auth/providers/github";

import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    // providers are simple array of objects which represents authentication providers
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        console.log("from line 17", credentials);
        await connectDb();
        console.log("from line 19", credentials.email, credentials.password);
        try {
          console.log("from line 21", credentials);
          const user = await Users.findOne({ email: credentials.email });
          console.log("from line 26", user.password);

          if (!user) {
            console.log("not found");
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          console.log(isPasswordCorrect);
          if (isPasswordCorrect) {
            console.log("from line 37", user);
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GitHubProvider({
      // profile(profile) {
      //   console.log("from line 50 github", profile);
      //   let userRole = "Github User";
      //   if (profile?.email === "fahmudul234@gmail.com") {
      //     userRole = "admin";
      //   }
      //   return {
      //     ...profile,
      //     role: userRole,
      //   };
      // },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      // profile(profile) {
      //   console.log("from line 50 github", profile);

      //   return {
      //     ...profile,
      //     id: profile.sub,
      //     role: userRole,
      //   };
      // },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {  
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      console.log("from line 58", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      console.log("from line 68", session);
      return session;
    },
    
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
