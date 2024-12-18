import { Link } from "expo-router";
import { View } from "react-native";

const Index = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Link href={'/home'}>
                Going Home
            </Link>
        </View>
    )

}

export default Index;