import { useState } from "react";
import { Alert } from "react-native";
import moment from "moment";
import { useRouter } from "expo-router";

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
    const [subjectCode, setSubjectCode] = useState("");
    const [courseAndSection, setCourseAndSection] = useState("");

    const datePicker = useDatePicker();
    const timeInPicker = useTimePicker();
    const timeOutPicker = useTimePicker();
    const dayFormat = moment(datePicker.date).format("dddd");

    const { session } = useAuth();
    const router = useRouter();

    const handleReserve = async () => {
        if (
            !subjectCode || !courseAndSection || !datePicker.date ||
            !timeInPicker.time || !timeOutPicker.time
        ) {
            Alert.alert("Please fill the information properly!");
            return;
        }

        if (moment(timeInPicker.time).isSame(moment(timeOutPicker.time))) {
            Alert.alert("Reserve time-in and time-out cannot be the same!");
            return;
        }

        if (
            (moment(timeInPicker.time) > moment(timeOutPicker.time)) &&
            (moment(timeOutPicker.time) < moment(timeInPicker.time))
        ) {
            Alert.alert("It's impossible to book that time!");
            return;
        }

        try {
            const { bookedRooms, schedule } = await useCheckForOverlap(
                roomId,
                moment(datePicker.date).format("DD MMMM YYYY"),
                moment(timeInPicker.time).toISOString(),
                moment(timeOutPicker.time).toISOString(),
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
                moment(datePicker.date).format("DD MMMM YYYY"),
                subjectCode,
                courseAndSection,
                moment(timeInPicker.time).toISOString(),
                moment(timeOutPicker.time).toISOString(),
                "ongoing",
            );
            onSuccess((await insert).id);
        } catch (error) {
            Alert.alert("Error, please contact the administrator");
            console.log(moment(timeOutPicker.time).format("HH:mm:ssZ"));
            console.log(error);
        }
    };

    const onSuccess = (id: string) => {
        if (id) {
            router.replace({
                pathname: "/screens/bookingReceipt/[id]",
                params: {
                    id: id,
                    subjectName: subjectCode,
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
        subjectCode,
        setSubjectCode,
        courseAndSection,
        setCourseAndSection,
        datePicker,
        timeInPicker,
        timeOutPicker,
        handleReserve,
    };
};

export default useHandleReserve;
