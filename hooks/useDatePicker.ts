import React from 'react'

const useDatePicker = (initialDate = new Date()) => {
    const [date, setDate] = React.useState(initialDate);
    const [open, setOpen] = React.useState<boolean>(false);

    const onConfirm = (selectDate: Date) => {
        setDate(selectDate);
        setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    }

  return { date, open, setOpen, onConfirm, onCancel};
}

export default useDatePicker