import { StyleSheet, useColorScheme } from "react-native";

const useColorTheme = () => {
    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === "light"
        ? styles.lightThemeText
        : styles.darkThemeText;

    const themeContainerStyle = colorScheme === "light"
        ? styles.lightThemeBackground
        : styles.darkThemeBackground;

    return { themeTextStyle, themeContainerStyle };
};

export default useColorTheme;

const styles = StyleSheet.create({
    lightThemeText: {
        color: "#000000",
    },
    darkThemeText: {
        color: "#ffffff",
    },
    lightThemeBackground: {
        backgroundColor: "#ffffff",
    },
    darkThemeBackground: {
        backgroundColor: "#000000",
    },
});
