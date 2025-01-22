import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/utils/supabase";
import moment from "moment";
import { Alert } from "react-native";

export const useUpdateProfiles = async (
    username: string | null,
    avatar_url: string | null,
) => {
    const { session } = useAuth();

    try {
        if (!session?.user) throw new Error("No user detected");

        const updates = {
            id: session?.user.id,
            username,
            avatar_url,
            updated_at: moment().toISOString(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) throw error;
    } catch (e) {
        if (e instanceof Error) {
            Alert.alert(e.message);
        }
    }
};
