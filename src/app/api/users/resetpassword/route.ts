"use server" 
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // checking for existing user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { error: "User doesn't exist" },
                { status: 400 }
            );
        }

        await sendEmail({
            email,
            emailType: "FORGET_PASSWORD",
            userId: existingUser._id,
        });

        return NextResponse.json({
            message: "Password reset token sent successfully. Please check your email.",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
