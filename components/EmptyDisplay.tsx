import { View, Text } from "react-native";
import { Image } from "expo-image";
import useColorTheme from "@/hooks/useColorTheme";

const EmptyDisplay = () => {
  const { themeContainerStyle, themeTextStyle } = useColorTheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50,
      }}
    >
      <Image
        source={require("@/assets/svg/booking_empty.svg")}
        style={{ width: 100, height: 100 }}
      />
      <Text style={themeTextStyle}>Oops! It is empty</Text>
    </View>
  );
};

export default EmptyDisplay;
