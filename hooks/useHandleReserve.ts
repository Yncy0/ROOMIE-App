import { useState } from "react";
import { Alert } from "react-native";
import moment from "moment";
import { useRouter } from "expo-router";

import useDatePicker from "@/hooks/useDatePicker";
import useTimePicker from "@/hooks/useTimePicker";
import useInsertBookedRooms from "@/hooks/useInsertBookedRooms";
import { useAuth } from "@/providers/AuthProvider";

interface UseHandleReserveProps {
    roomId: any;
    roomName: string;
    roomCategory: string;
    roomImage: string;
}

//FIXME: Too much jiberish code!
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
            timeOutPicker.time &&
            timeInPicker.time === timeOutPicker.time
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
            Alert.alert("Please fill the information properly!");
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
