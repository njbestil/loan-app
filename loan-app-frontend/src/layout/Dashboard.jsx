import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import Footer from "../components/Footer";

export default function Webpage({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                {children}
            </div>

            {/* <Footer /> */}
        </>
    )
}