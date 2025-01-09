import React from 'react'
import { Tables } from '@/database.types'
import { supabase } from '@/utils/supabase';

type Course = Tables<'course'>;

const useFetchCourse = () => {
    const [data, setData] = React.useState<Course[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const { data: course, error } = await supabase
            .from('course')
            .select('*')

            if (error) throw error;

            if (course) {
                setData(course);
            }
        } 
        fetchData();
    }, []);

  return data;
}

export default useFetchCourse