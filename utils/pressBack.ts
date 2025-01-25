import { router, useFocusEffect } from "expo-router";
import React from "react";
import { BackHandler } from "react-native";

export const pressBack = (customRoute: any) => {
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                router.replace(customRoute);
                return true; // Return true to prevent default behavior
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => {
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    onBackPress,
                );
            };
        }, []),
    );
};
