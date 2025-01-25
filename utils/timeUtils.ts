import dayjs from "dayjs";

export const generateDatesForCurrentMonth = () => {
    const startOfMonth = dayjs();
    const endOfMonth = dayjs().endOf("month");
    const dates = [];

    let date = startOfMonth;
    while (date <= endOfMonth) {
        dates.push(date.clone());
        date = date.add(1, "day");
    }
    return dates;
};

export const formatCompleteDate = (v?: any) => {
    return dayjs(v).format("dddd: DD MMMM YYYY");
};

export const formatTimeMeridian = (v?: any) => {
    return dayjs(v).format("HH:mm a");
};

export const formatDate = (v?: any) => {
    return dayjs(v).format("DD MMMM YYYY");
};
