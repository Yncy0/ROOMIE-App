import { View, Text } from "tamagui";
import { Image } from "expo-image";

const EmptyDisplay = () => {
  return (
    <View alignItems="center" justifyContent="center" pb={50}>
      <Image
        source={require("@/assets/images/booking_empty.svg")}
        style={{ width: 100, height: 100 }}
      />
      <Text>Oops! It is empty</Text>
    </View>
  );
};

export default EmptyDisplay;
