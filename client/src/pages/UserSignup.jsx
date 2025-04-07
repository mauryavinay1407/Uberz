import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setUser } = useUser();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = { fullname: { firstname, lastname }, email, password };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if (response.status === 201) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem("token", data.token);
            navigate("/home");
        }

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="h-screen w-full flex flex-col items-center bg-white px-4 py-6">
            <div className="w-full max-w-md">
                <img
                    className="w-24 mb-10"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
                    alt="Uber logo"
                />

                <form onSubmit={submitHandler} className="p-2">
                <h3 className='text-lg w-1/2  font-medium mb-4'>What's your name</h3>
                    <div className="flex gap-4 mb-5">
                        <input
                            type="text"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="First Name"
                            className="w-1/2 px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                            type="text"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Last Name"
                            className="w-1/2 px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                <h3 className='text-lg w-1/2  font-medium mb-4'>What's your email</h3>
                    <div className="flex mb-5">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                <h3 className='text-lg w-1/2  font-medium mb-4'>Enter Password</h3>
                    <div className="flex mb-6">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white text-lg font-medium py-2 rounded-md hover:bg-gray-900 cursor-pointer transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
