import { useState } from "react";
import { Alert } from "react-native";
import moment from "moment";
import { useRouter } from "expo-router";
import useInsertBookedRooms from "@/hooks/useInsertBookedRooms";
import useFetchBookedRooms from "@/hooks/useFetchBookedRooms";
import { useAuth } from "@/providers/AuthProvider";

import useDatePicker from "@/hooks/useDatePicker";
import useTimePicker from "@/hooks/useTimePicker";
import { router } from "expo-router";

interface UseHandleReserveProps {
    roomId: any;
    roomName: string;
    roomCategory: string;
    roomImage: string;
}

const useHandleReserve = (
    { roomId, roomName, roomCategory, roomImage }: UseHandleReserveProps,
) => {
    const [subjectName, setSubjectName] = useState("");
    const [courseAndSection, setCourseAndSection] = useState("");

    const datePicker = useDatePicker();
    const timeInPicker = useTimePicker();
    const timeOutPicker = useTimePicker();

    const { session } = useAuth();
    const router = useRouter();

    const handleReserve = async () => {
        if (
            subjectName &&
            courseAndSection &&
            datePicker.date &&
            timeInPicker.time &&
            timeOutPicker.time
        ) {
            try {
                const insert = await useInsertBookedRooms(
                    session?.user.id,
                    roomId,
                    moment(datePicker.date).format("DD MMMM YYYY"),
                    subjectName,
                    courseAndSection,
                    moment(timeInPicker.time).format("LT"),
                    moment(timeOutPicker.time).format("LT"),
                );
                onSuccess(insert.id);
            } catch (error) {
                Alert.alert("Error");
            }
        } else {
            Alert.alert("Please fill all the blanks!");
        }
    };

    const onSuccess = (id: string) => {
        if (id) {
            router.replace({
                pathname: "/screens/bookingReceipt/[id]",
                params: {
                    id: id,
                    subjectName: subjectName,
                    courseAndSection: courseAndSection,
                    date: moment(datePicker.date).format("DD MMMM YYYY"),
                    timeIn: moment(timeInPicker.time).format("LT"),
                    timeOut: moment(timeOutPicker.time).format("LT"),
                    roomId: roomId,
                    roomCategory: roomCategory,
                    roomImage: roomImage,
                    roomName: roomName,
                    customRoute: "/(tabs)",
                },
            });
        } else {
            Alert.alert("Cannot redirect");
        }
    };

    return {
        subjectName,
        setSubjectName,
        courseAndSection,
        setCourseAndSection,
        datePicker,
        timeInPicker,
        timeOutPicker,
        handleReserve,
    };
};

export default useHandleReserve;
