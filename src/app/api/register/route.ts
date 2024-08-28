import bcryptjs from "bcryptjs";
import connectDb from "@/Database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/Models/userModel";
export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const { username, email, password } = await request.json();
    const isExist = await Users.findOne({ email });
    if (isExist) {
      return NextResponse.json({ error: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new Users({ username, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User created", status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message, status: 500 });
  }
};
