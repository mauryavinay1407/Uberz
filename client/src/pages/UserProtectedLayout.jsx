import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {Spinner} from "../components/Spinner";
import axios from "axios";

const UserProtectedLayout = ({ children }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const { setUser } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 201) {
                    setUser(response.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [token]);

    if (isLoading) {
        return <div className="w-screen h-screen flex justify-center items-center">
          <Spinner size="lg"/>
        </div> 
    }

    return <>{children}</>;
};

export default UserProtectedLayout;
