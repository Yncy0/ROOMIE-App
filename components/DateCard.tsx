import { Text, View } from "react-native";
import moment from "moment";


type Props = {
    date: any
}

export default function DateCard({ date }: Props) {
    // const formatDate = moment(date).format('ddd MMMM D, YYYY')
    
    return(
        <View
            style={{
                flexDirection: 'column',
                gap: 10,
                alignItems: "center",
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: "#E8E8E8",
                borderRadius: 10,
                height: 90,
                width: 60
            }}
        >
            <Text style={{fontSize: 16, fontWeight: '700'}}>
                {moment(date).format('ddd')}
            </Text>
            <Text style={{fontSize: 16, fontWeight:'800'}}>
                {moment(date).format('DD')}
            </Text>
        </View>
    )
}