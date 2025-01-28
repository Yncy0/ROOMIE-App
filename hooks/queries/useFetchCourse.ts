import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase";

export const useFetchCourse = () => {
    const courseQuery = useQuery({
        queryKey: ["course"],
        queryFn: async () => {
            const { data: course, error } = await supabase
                .from("course")
                .select("*");

            if (error) {
                console.error(error);
                throw error;
            }

            if (course) console.log(course);

            return course;
        },
    });

    return courseQuery;
};

export const useFetchCourseName = () => {
    const courseQuery = useQuery({
        queryKey: ["course"],
        queryFn: async () => {
            const { data: course, error } = await supabase
                .from("course")
                .select("course_name");

            if (error) {
                console.error(error);
                throw error;
            }

            if (course) console.log(course);

            return course;
        },
    });

    return courseQuery;
};
