import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";


type Props = {
    placeholder: string;
};

export default function Searchbar({ placeholder }: Props) {
    const [text, setText] = React.useState<string>("");

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                height: 40,
                margin: 12,
                width: 250,
                backgroundColor: "#F1F1F1",
                paddingHorizontal: 12,
                borderRadius: 25,
            }}
        >
        <Ionicons 
            name={'search'} 
            size={24}
        />
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: '#333'
          }}
          placeholder={placeholder}
          value={text}
          onChangeText={setText}
          clearButtonMode='always'
        />
        </View>
    )
}