import { useColorScheme } from "react-native";

const colorScheme = useColorScheme();

export const useThemeContainer = colorScheme === "light" ? "white" : "black";
