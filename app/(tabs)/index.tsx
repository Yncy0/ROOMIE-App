import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { 
  Text, 
  View, 
  TextInput,
  FlatList,
  Pressable,
  Dimensions
} from "react-native";
import Searchbar from "@/components/Searchbar";
import FilterButton from "@/components/FilterButton";
import BookedCard from "@/components/BookedCard";


const {width} = Dimensions.get('screen');

export default function Index() {
  const DATA = [
    {
      "id": 1,
      "room_name": "SA 301",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png")
    },
    {
      "id": 2,
      "room_name": "SA 302",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png")
    },
    {
      "id": 3,
      "room_name": "SA 303",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png")
    },
    {
      "id": 4,
      "room_name": "SA 304",
      "room_location": "St. Augustine Bldg",
      "room_description": "Computer Laboratory",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png")
    },
    {
      "id": 5,
      "room_name": "SA 305",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png")
    },
];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flexDirection: 'column',
          gap: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            width: '100%',
            paddingTop: 20,
            paddingHorizontal: 20
          }}
        >
          <Searchbar placeholder="Search"/>
          <FilterButton color="#2B32B2"/>
        </View>
        <View 
          style={{
            width: '100%', 
            flexDirection: "row", 
            justifyContent:"space-between", 
            paddingHorizontal: 20
          }}
        >
          <Text>{"My Booking"}</Text>
          <Pressable>
            <Text>{"See all"}</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialNumToRender={7}
          data={DATA}
          renderItem={({item, index}) => <BookedCard items={item} key={index}/>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
