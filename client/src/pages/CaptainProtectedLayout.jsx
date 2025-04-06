import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Spinner} from "../components/Spinner";
import axios from "axios";
import { useCaptain } from "../context/CaptainContext";

const CaptainProtectedLayout = ({ children }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const { setCaptain } = useCaptain();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/captain-login");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 201) {
                    setCaptain(response.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem("token");
                navigate("/captain-login");
            });
    }, [token]);

    if (isLoading) {
        return <div className="w-screen h-screen flex justify-center items-center">
          <Spinner size="lg"/>
        </div> 
    }

    return <>{children}</>;
};

export default CaptainProtectedLayout;
