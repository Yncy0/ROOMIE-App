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

    return { themeTextStyle, themeContainerStyle };
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
        backgroundColor: "#000000",
    },
    lightThemeBackground: {
        backgroundColor: "#ffffff",
    },
    darkThemeBackground: {
        backgroundColor: "#000000",
    },
});
