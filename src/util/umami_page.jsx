import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export const useUmamiPageView = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.umami) {
            window.umami.trackView(location.pathname);
        }
    }, [location]);
};