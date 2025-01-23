import { StyleSheet, useColorScheme } from "react-native";

const useColorTheme = () => {
    const colorScheme = useColorScheme();

    const colors = {
        text: colorScheme === "light"
            ? styles.lightThemeText
            : styles.darkThemeText,
        background: colorScheme === "light"
            ? styles.lightThemeBackground
            : styles.darkThemeBackground,
    };

    return colors;
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
        color: "#ffffff",
    },
    darkThemeBackground: {
        color: "#000000",
    },
});
