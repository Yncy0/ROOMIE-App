import { useColorScheme } from "react-native";

const colorScheme = useColorScheme();

export const useThemeText = colorScheme === "light" ? "black" : "white";
