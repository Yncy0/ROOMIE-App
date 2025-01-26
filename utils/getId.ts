import { supabase } from "./supabase";

export const getId = async () => {
    //GETTING ID
    const { data: { user }, error } = await supabase.auth.getUser();
    let userId: string = "";

    if (user) {
        userId = user?.id;
        console.log(userId);
    }

    if (error) {
        console.error(error);
        throw error;
    }

    return userId;
};
