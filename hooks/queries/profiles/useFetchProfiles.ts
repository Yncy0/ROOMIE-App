import React from "react";
import { Alert } from "react-native";

import { supabase } from "@/utils/supabase";
import { useAuth } from "@/providers/AuthProvider";

import * as SplashScreen from "expo-splash-screen";

const useFetchProfiles = () => {
    const [username, setUsername] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [avatarUrl, setAvatarUrl] = React.useState("");

    const { session } = useAuth();

    React.useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error("No user in this session!");

            const { data: profiles, error, status } = await supabase
                .from("profiles")
                .select(`id, username, avatar_url`)
                .eq("id", session?.user.id)
                .single();

            if (error && status !== 406) throw error;

            if (profiles) {
                setUsername(profiles.username as string);
                setAvatarUrl(profiles.avatar_url as string);
            }
        } catch (error) {
            if (error instanceof Error) Alert.alert(error.message);
        } finally {
            setLoading(false);
            SplashScreen.hideAsync();
        }
    }

    return { username, setUsername, loading, avatarUrl, setAvatarUrl };
};

export default useFetchProfiles;
