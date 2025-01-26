import React from "react";

const useTimePicker = (initialTime = new Date()) => {
    const [time, setTime] = React.useState(initialTime);
    const [open, setOpen] = React.useState<boolean>(false);

    const onConfirm = (selectTime: Date) => {
        setTime(selectTime);
        setOpen(false);
    };

    const onClose = () => {
        setOpen(false);
    };

    return { time, setTime, open, setOpen, onConfirm, onClose };
};

export default useTimePicker;
