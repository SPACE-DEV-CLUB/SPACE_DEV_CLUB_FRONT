import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

export default function useAuthentication() {
    const router = useRouter();
    const userCookieData = Cookies.get("user");

    useEffect(() => {
        if (!userCookieData) {
            router.push('/'); 
        }
    }, []);
}