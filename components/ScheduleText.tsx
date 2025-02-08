import useThemeColor from "@/hooks/useThemeColor";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  items: any;
};

export default function ScheduleText({ items }: Props) {
  const { themeContainerStyle, themeTextStyle } = useThemeColor();

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     updateSchedule();
  //     console.log("UPDATED SCHEDULE Status");
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  // const updateSchedule = async () => {
  //   const scheduleId = items.id;
  //   const assignedWeekday = items.days; // Replace with the actual assigned weekday

  //   try {
  //     const updatedSchedule = await updateScheduleDate(
  //       scheduleId,
  //       assignedWeekday
  //     );
  //     console.log("Updated schedule:", updatedSchedule);
  //   } catch (error) {
  //     console.error("Failed to update schedule:", error);
  //   }
  // };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View style={styles.wrapper1}>
        <View>
          <View style={styles.wrapper2}>
            <Text style={[styles.header1, themeTextStyle]}>
              {items.subject.subject_code}
            </Text>
            <Text style={themeTextStyle}>{items.status}</Text>
          </View>
          <Text style={[styles.subHeader, themeTextStyle]}>
            {items.subject.subject_name}
          </Text>
        </View>
        <View style={styles.container1}>
          <Text style={[styles.text1, themeTextStyle]}>
            {items.course.course_name}
          </Text>
          <Text
            style={[styles.text1, themeTextStyle]}
          >{`${items.timef_in} - ${items.timef_out}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 1,
    minWidth: "100%",
    padding: 15,
  },
  wrapper1: {
    flex: 1,
    gap: 5,
    flexDirection: "column",
  },
  wrapper2: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  header1: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 12,
  },
  container1: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text1: {
    fontSize: 12,
  },
});
