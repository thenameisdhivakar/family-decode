"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn !== "true") {
            // Not logged in? Send them to the login page
            router.replace("/login");
        } else {
            // Logged in? Allow the page to show
            setIsAuthorized(true);
        }
    }, [router]);

    // While checking, show a black screen so the user doesn't see 
    // the protected content for a split second (the "flicker")
    if (!isAuthorized) {
        return <div className="h-screen bg-black" />;
    }

    return <>{children}</>;
}