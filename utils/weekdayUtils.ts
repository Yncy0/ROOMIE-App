export const getNextWeekdayDate = (weekday: string): string => {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const targetDayIndex = daysOfWeek.indexOf(weekday);

    if (targetDayIndex === -1) {
        throw new Error(`Invalid weekday: ${weekday}`);
    }

    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the difference in days to the next target weekday
    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd <= 0) {
        daysToAdd += 7; // Move to the next week
    }

    // Add the required days to the current date
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);

    // Format the date as YYYY-MM-DD (ISO format)
    return nextDate.toISOString().split("T")[0];
};
