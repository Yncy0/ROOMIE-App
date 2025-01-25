import { supabase } from "./supabase";

export const getId = async () => {
    //GETTING ID
    const { data: { user } } = await supabase.auth.getUser();
    let userId: string = "";

    if (user) {
        userId = user?.id;
    }

    return userId;
};
