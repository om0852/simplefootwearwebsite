import { NextResponse } from "next/server";
import { connectToDB } from "../../utils/connect";
import User from "@/models/User";

export async function POST(req){
    try {
        await connectToDB();
        const {email,password,type="customer"}=await req.json();
        const data =await User.findOne({email});
        if(data){
            return NextResponse.json("Accout already exist");
        }
        await User.create({email,password,type});
        return NextResponse.json({message:"added"},{status:200})
    } catch (error) {
        return NextResponse.json({message:error.message},{status:400})
    }

}
