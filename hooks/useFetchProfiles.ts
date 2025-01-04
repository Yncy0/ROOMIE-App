import { useAuth } from '@/context/AuthProvider';
import { Tables } from '@/database.types'
import { supabase } from '@/utils/supabase';
import React from 'react'
import { Alert } from 'react-native';


type Profiles = Tables<'profiles'>


const useFetchProfiles = () => {
    const [data, setData] = React.useState<Profiles[]>([]);
    const [username, setUsername] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);

    const { session } = useAuth();

    React.useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user in this session!');

            const { data: profiles, error, status } =  await supabase
                .from('profiles')
                .select(`id, username, avatar_url`)
                //USE THIS FOR TESTING PURPOSES: 'e461e38c-fd34-42ec-8fae-31c741af6707'
                //FIXME: Need to extract session?.user.id
                .eq('id', 'e461e38c-fd34-42ec-8fae-31c741af6707')
                .single()

            if (error && status !== 406) throw error;

            if (profiles) {
                setUsername(profiles.username as string);
            }

        } catch (error) {
            if (error instanceof Error) Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { username };
}

export default useFetchProfiles

