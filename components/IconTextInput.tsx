import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";


type Props = {
    icon: any,
    placeholder: string,
}

export default function IconTextInput({ icon, placeholder }: Props) {
    const [text, setText] = React.useState<string>("");

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 10,
                gap: 20,
                padding: 10,
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