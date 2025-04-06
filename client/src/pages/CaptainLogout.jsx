import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const CaptainLogout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/captain-login");
                }
            })
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    );
};

export default CaptainLogout;
