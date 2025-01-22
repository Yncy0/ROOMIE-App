import useSubscriptionSchedule from "@/hooks/queries/schedule/useSubscription";
import { Text, View } from "react-native";

type Props = {
  items: any;
};

export default function ScheduleText({ items }: Props) {
  useSubscriptionSchedule();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$white1",
        borderRadius: 10,
        elevation: 1,
        minWidth: "100%",
        padding: 15,
      }}
    >
      <View style={{ flex: 1, gap: 5 }}>
        <View>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {items.subject.subject_code}
            </Text>
            <Text>{items.status}</Text>
          </View>
          <Text style={{ fontSize: 12 }}>{items.subject.subject_name}</Text>
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text
            style={{ fontSize: 12 }}
          >{`${items.course.course_name} ${items.course.course_year}${items.course.course_section} `}</Text>
          <Text
            style={{ fontSize: 12 }}
          >{`${items.time_in}-${items.time_out}`}</Text>
        </View>
      </View>
    </View>
  );
}
