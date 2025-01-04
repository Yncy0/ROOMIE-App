import { useAuth } from '@/context/AuthProvider';
import { Tables } from '@/database.types'
import { supabase } from '@/utils/supabase';
import React from 'react'
import { Alert } from 'react-native';


type Profiles = Tables<'profiles'>


const useFetchProfiles = () => {
    const [data, setData] = React.useState<Profiles[]>([]);
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

            if (error && status !== 406) throw error;

            if (profiles) {
                setData(profiles as Profiles[]);
            }

        } catch (error) {
            if (error instanceof Error) Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    }
}

export default useFetchProfiles

