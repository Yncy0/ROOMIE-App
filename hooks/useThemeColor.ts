import { black500, gray500 } from "@/constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";

const useThemeColor = () => {
    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === "light"
        ? styles.lightThemeText
        : styles.darkThemeText;

    const themeContainerStyle = colorScheme === "light"
        ? styles.lightThemeContainer
        : styles.darkThemeContainer;

    const themeBackgroundStyle = colorScheme === "light"
        ? styles.lightThemeBackground
        : styles.darkThemeBackground;

    const themeInputStyle = colorScheme === "light"
        ? styles.lightThemeInput
        : styles.darkThemeInput;

    return {
        themeTextStyle,
        themeContainerStyle,
        themeBackgroundStyle,
        themeInputStyle,
    };
};

export default useThemeColor;

const styles = StyleSheet.create({
    lightThemeText: {
        color: "#000000",
    },
    darkThemeText: {
        color: "#ffffff",
    },
    lightThemeContainer: {
        backgroundColor: "#ffffff",
    },
    darkThemeContainer: {
        backgroundColor: black500,
    },
    lightThemeBackground: {
        backgroundColor: "#ffffff",
    },
    darkThemeBackground: {
        backgroundColor: "#000000",
    },
    lightThemeInput: {
        backgroundColor: gray500,
    },
    darkThemeInput: {
        backgroundColor: black500,
    },
});
