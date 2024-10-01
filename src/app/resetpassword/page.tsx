"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPasswordPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        // checking for valid email
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            alert("Enter valid Email")
            return;
        }

        setEmail("");
        const response = await axios.post("api/users/resetpassword", { email });

        if(!response.data.success){
            alert("Can't Process the request")
        }
    };

    const username = "username";
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="px-8 py-6  rounded-lg shadow-md ">
                <h4>{username}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-300 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="p-2 border border-gray-500 rounded-lg my-4 focus:border-gray-200 hover:bg-slate-500 w-full
                            "
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
