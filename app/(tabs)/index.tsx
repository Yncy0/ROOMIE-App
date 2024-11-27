import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { 
  Text, 
  View, 
  TextInput,
  FlatList,
} from "react-native";
import Searchbar from "@/components/Searchbar";
import FilterButton from "@/components/FilterButton";
import BookedCard from "@/components/BookedCard";


export default function Index() {
  const DATA = [
    {
      "id": 1,
      "room_name": "SA 301",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": "@/assets/images/_dummy-img.png"
    },
    {
      "id": 2,
      "room_name": "SA 302",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": "@/assets/images/_dummy-img.png"
    },
    {
      "id": 3,
      "room_name": "SA 303",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": "@/assets/images/_dummy-img.png"
    },
    {
      "id": 4,
      "room_name": "SA 304",
      "room_location": "St. Augustine Bldg",
      "room_description": "Computer Laboratory",
      "room_capacity": 30,
      "room_image": "@/assets/images/_dummy-img.png"
    },
    {
      "id": 5,
      "room_name": "SA 305",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": "@/assets/images/_dummy-img.png"
    },
];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: "center"
          }}
        >
          <Searchbar placeholder="Search"/>
          <FilterButton color="#2B32B2"/>
        </View>
        <FlatList
          data={DATA}
          renderItem={({item}) => <BookedCard imageSource={item.room_image} room_name={item.room_name}/>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
