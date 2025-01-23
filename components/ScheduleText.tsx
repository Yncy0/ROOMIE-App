import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import useColorTheme from "@/hooks/useColorTheme";
import dayjs from "dayjs";
import { Text, View } from "react-native";

type Props = {
  items: any;
};

export default function ScheduleText({ items }: Props) {
  useSubscriptionSchedule();
  const { themeContainerStyle, themeTextStyle } = useColorTheme();

  const timeInFormat = dayjs(items.time_in).format("HH:mm a");

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          elevation: 1,
          minWidth: "100%",
          padding: 15,
        },
        themeContainerStyle,
      ]}
    >
      <View style={{ flex: 1, gap: 5, flexDirection: "column" }}>
        <View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={[{ fontSize: 14, fontWeight: "bold" }, themeTextStyle]}
            >
              {items.subject.subject_code}
            </Text>
            <Text style={themeTextStyle}>{items.status}</Text>
          </View>
          <Text style={[{ fontSize: 12 }, themeTextStyle]}>
            {items.subject.subject_name}
          </Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text
            style={[{ fontSize: 12 }, themeTextStyle]}
          >{`${items.course.course_name} ${items.course.course_year}${items.course.course_section} `}</Text>
          <Text
            style={[{ fontSize: 12 }, themeTextStyle]}
          >{`${items.time_in} - ${items.time_out}`}</Text>
        </View>
      </View>
    </View>
  );
}
