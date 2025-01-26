import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import useDatePicker from "@/hooks/pickers/useDatePicker";
import useTimePicker from "@/hooks/pickers/useTimePicker";
import { useAuth } from "@/providers/AuthProvider";
import useCheckForOverlap from "./queries/bookedRooms/useCheckOverlap";
import { useUpdateBookedRooms } from "./queries/bookedRooms/useUpdateBookedRooms";

interface UseHandleEditProps {
    bookingId: any;
    roomId: any;
    roomImage: any;
    initialDate: string;
    initialTimeIn: string;
    initialTimeOut: string;
    initialSubjectCode: string;
    initialCourseAndSection: string;
}

const useHandleEdit = ({
    bookingId,
    roomId,
    roomImage,
    initialDate,
    initialTimeIn,
    initialTimeOut,
    initialSubjectCode,
    initialCourseAndSection,
}: UseHandleEditProps) => {
    const dayjs = require("dayjs");
    require("dayjs/plugin/timezone");
    require("dayjs/plugin/utc");

    // Load plugins
    dayjs.extend(require("dayjs/plugin/timezone"));
    dayjs.extend(require("dayjs/plugin/utc"));

    const [subjectCode, setSubjectCode] = useState(initialSubjectCode);
    const [courseAndSection, setCourseAndSection] = useState(
        initialCourseAndSection,
    );

    const datePicker = useDatePicker(new Date(initialDate));
    const timeInPicker = useTimePicker(new Date(initialTimeIn));
    const timeOutPicker = useTimePicker(new Date(initialTimeOut));

    const localTimeIn = dayjs(timeInPicker.time).tz("Asia/Manila").format();
    const localTimeOut = dayjs(timeOutPicker.time).tz("Asia/Manila").format();

    const { session } = useAuth();
    const router = useRouter();

    const handleEdit = async () => {
        if (
            !subjectCode || !courseAndSection || !datePicker.date ||
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
            // const { bookedRooms, schedule } = await useCheckForOverlap(
            //     roomId,
            //     dayjs(datePicker.date).format("DD MMMM YYYY"),
            //     localTimeIn,
            //     localTimeOut,
            // );
            // if (!bookedRooms || !schedule) {
            //     Alert.alert("The room has already ongoing schedule!");
            //     return;
            // }

            const updated = await useUpdateBookedRooms(
                bookingId,
                session?.user.id,
                roomId,
                dayjs(datePicker.date).format("DD MMMM YYYY"),
                subjectCode,
                courseAndSection,
                localTimeIn,
                localTimeOut,
                "ONGOING",
            );
            onSuccess(bookingId);
        } catch (error) {
            Alert.alert("Error, please contact the administrator");
            console.log(error);
        }
    };

    const onSuccess = (id: string) => {
        if (id) {
            router.replace({
                pathname: "/screens/bookingReceipt/[id]",
                params: {
                    id: id,
                    subjectCode: subjectCode,
                    courseAndSection: courseAndSection,
                    date: dayjs(datePicker.date).format("DD MMMM YYYY"),
                    timeIn: dayjs(timeInPicker.time).format("HH:mm a"),
                    timeOut: dayjs(timeOutPicker.time).format("HH:mm a"),
                    roomId: roomId,
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
        handleEdit,
    };
};

export default useHandleEdit;
