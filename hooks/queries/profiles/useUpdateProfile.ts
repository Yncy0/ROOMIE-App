import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/utils/supabase";
import moment from "moment";
import { Alert } from "react-native";

const getId = async () => {
    //GETTING ID
    const { data: { user } } = await supabase.auth.getUser();
    let userId: string = "";

    if (user) {
        userId = user?.id;
    }

    return userId;
};

export const useUpdateProfiles = () => {
    const { session } = useAuth();

    const updateProfiles = async (
        username: string | null,
        avatar_url: string | null,
    ) => {
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

    return updateProfiles;
};

export const useUpdateExpoToken = async (token: string) => {
    const userId = await getId();

    const { data, error } = await supabase
        .from("profiles")
        .update({ expo_push_token: token })
        .eq("id", userId)
        .select();

    if (error) throw error;

    return data;
};
