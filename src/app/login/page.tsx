"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        try {
            const response = await axios.post("api/users/login", user);
            if (response.status === 500) {
                toast.error("Server error");
                return;
            }
            if (response.status === 400) {
                toast.error(response.data.error);
                return;
            }
            toast.success("Login successful");
            router.push(`/profile/${response.data.user._id}`);
        } catch (err: any) {
            console.error(err);
        }
    };

    // Function for handling "Forgot Password" link click
    const handleForgotPassword = () => {
        toast.loading("Redirecting to password reset page...");
        router.push("/resetpassword");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
                className="border-2 border-gray-300 p-1 rounded-lg text-black "
                type="text"
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <hr />
            <label htmlFor="password">Password</label>
            <input
                className="border-2 border-gray-300 p-1 rounded-lg text-black "
                type="password"
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <hr />
            <button
                className="p-2 border border-gray-500 rounded-lg my-4 focus:border-gray-200 hover:bg-slate-500 "
                onClick={onLogin}
            >
                Login
            </button>
            <Link
                className="underline text-blue-300 hover:text-blue-500"
                href="/signup"
            >
                Visit Signup Page
            </Link>
            <br />
            {/* Added "Forgot Password" link */}
            <span
                className="text-blue-300 underline hover:text-blue-500 cursor-pointer"
                onClick={handleForgotPassword}
            >
                Forgot Password?
            </span>
        </div>
    );
}
