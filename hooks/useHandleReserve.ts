import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import dayjs from "dayjs";

import useDatePicker from "@/hooks/pickers/useDatePicker";
import useTimePicker from "@/hooks/pickers/useTimePicker";
import useInsertBookedRooms from "@/hooks/queries/bookedRooms/useInsertBookedRooms";
import { useAuth } from "@/providers/AuthProvider";
import { useFetchScheduleWithRoom } from "./queries/schedule/useFetchSchedule";
import useCheckForOverlap from "./queries/bookedRooms/useCheckOverlap";

interface UseHandleReserveProps {
    roomId: any;
    roomName: string;
    roomCategory: string;
    roomImage: string;
}

const useHandleReserve = ({
    roomId,
    roomName,
    roomCategory,
    roomImage,
}: UseHandleReserveProps) => {
    const [subjectName, setSubjectName] = useState("");
    const [courseAndSection, setCourseAndSection] = useState("");

    const datePicker = useDatePicker();
    const timeInPicker = useTimePicker();
    const timeOutPicker = useTimePicker();
    const dayFormat = dayjs(datePicker.date).format("dddd");

    const { session } = useAuth();
    const router = useRouter();

    const handleReserve = async () => {
        if (
            !subjectName || !courseAndSection || !datePicker.date ||
            !timeInPicker.time || !timeOutPicker.time
        ) {
            Alert.alert("Please fill the information properly!");
            return;
        }

        if (dayjs(timeInPicker.time).isSame(dayjs(timeOutPicker.time))) {
            Alert.alert("Reserve time-in and time-out cannot be the same!");
            return;
        }

        if (
            (dayjs(timeInPicker.time) > dayjs(timeOutPicker.time)) &&
            (dayjs(timeOutPicker.time) < dayjs(timeInPicker.time))
        ) {
            Alert.alert("It's impossible to book that time!");
            return;
        }

        try {
            const { bookedRooms, schedule } = await useCheckForOverlap(
                roomId,
                dayjs(datePicker.date).format("DD MMMM YYYY"),
                dayjs(timeInPicker.time).toISOString(),
                dayjs(timeOutPicker.time).toISOString(),
            );
            if (!bookedRooms || !schedule) {
                Alert.alert(
                    "The room has already ongoing schedule!",
                );
                return;
            }

            const insert = useInsertBookedRooms(
                session?.user.id,
                roomId,
                dayjs(datePicker.date).format("DD MMMM YYYY"),
                subjectName,
                courseAndSection,
                dayjs(timeInPicker.time).toISOString(),
                dayjs(timeOutPicker.time).toISOString(),
                "ongoing",
            );
            onSuccess((await insert).id);
        } catch (error) {
            Alert.alert("Error, please contact the administrator");
            console.log(dayjs(timeOutPicker.time).format("HH:mm:ssZ"));
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
                    date: dayjs(datePicker.date).format("DD MMMM YYYY"),
                    timeIn: dayjs(timeInPicker.time).format("LT"),
                    timeOut: dayjs(timeOutPicker.time).format("LT"),
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
