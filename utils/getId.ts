import { supabase } from "./supabase";

export const getId = async () => {
    //GETTING ID
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user?.id;

    if (error) {
        console.error(error);
        throw error;
    }

    return userId;
};
