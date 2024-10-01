"use server";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
connectDB();

/**
 * Updates a user's password based on a forgot password token.
 *
 * Validates the token and hashes the new password before saving it to the user document.
 * Returns success message or relevant error.
 */
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token, password } = reqBody;
        if (!token) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }
        // checking for existing user
        const existingUser = await User.findOne({ forgotPasswordToken: token });
        if (!existingUser) {
            return NextResponse.json(
                { error: "Invalid Token" },
                { status: 400 }
            );
        }
        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        existingUser.password = hashedPassword;
        await existingUser.save();
        return NextResponse.json({
            message:
                "Password reset token sent successfully. Please check your email.",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
