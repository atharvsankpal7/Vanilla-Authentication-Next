"use client";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

const ResetConfirmation: React.FC = () => {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const password = useRef<HTMLInputElement>(null);

    const verifyPasswordToken = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault(); // Prevent form submission
        const urlToken = new URLSearchParams(window.location.search).get(
            "token"
        );
        setToken(urlToken || "");
        try {
            if (!password.current?.value) {
                toast.error("Please enter a password");
                return;
            }
            const response = await axios.post("/api/users/updatepassword", {
                token,
                password: password.current.value,
            });

            if (response.status === 200) {
                setVerified(true);
                toast.success("Password updated successfully");
                alert("Password updated successfully");
            } else {
                toast.error("Password update failed");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.error || "An error occurred");
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form
                onSubmit={verifyPasswordToken}
                className="max-w-md mx-auto p-6 rounded-md shadow-md"
            >
                <label htmlFor="password" className="block text-sm font-medium">
                    Insert New Password
                </label>
                <input
                    type="password"
                    id="password"
                    ref={password}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-800"
                />
                <button
                    type="submit"
                    className="p-2 border border-gray-500 rounded-lg my-4 focus:border-gray-200 hover:bg-slate-500 w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ResetConfirmation;
