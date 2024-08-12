import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/app/utils/connect";

export async function POST(req) {
  try {
    await connectToDB();
    const { email, password } =await req.json();
    const data = await User.findOne({ email, password });
    console.log(data)
    if (!data) {
      return NextResponse.json(
        { message: "Inavlid Credentails" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Login Successfully",data },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
