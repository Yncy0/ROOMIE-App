import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";


type Props = {
    icon: any,
    placeholder: string,
    width: number,
}

export default function IconTextInput({icon, placeholder, width}: Props) {
    const [text, setText] = React.useState<string>("");

    return (
        <View
            style={{
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                padding: 20
            }}
        >
            <MaterialIcons name={icon} size={24}/>
            <TextInput 
                placeholder={placeholder}
                value={text}
                onChangeText={setText}
            />
        </View>
    )
}