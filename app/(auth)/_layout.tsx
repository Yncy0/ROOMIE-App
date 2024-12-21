import { useAuth } from "@/context/AuthProvider";
import { Redirect, Stack } from "expo-router";


export default function AuthLayout() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Redirect href="/"/>

    return <Stack/>
}