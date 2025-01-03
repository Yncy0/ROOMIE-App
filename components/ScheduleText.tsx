import { Text, View } from "react-native";


type Props = {
    items: any
}

export default function ScheduleText({ items }: Props) {
    return (
        <View 
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: '#white',
                borderRadius: 10,
                shadowColor: 'black',   
                width: '100%',
                padding: 20
            }}
        >
            <View
                style={{
                    flex: 1,
                    gap: 5,
                }}  
            >
                <Text>{items.subject.subject_code}</Text>
                <Text>{items.course.course_name}</Text>
            </View>
            <Text>{`${items.time_in}-${items.time_out}`}</Text>
        </View>
    )
}