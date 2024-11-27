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
import RooomCardIndex from "@/components/RoomCardIndex";


export default function Index() {
  const DATA = [
    {
      "id": 1,
      "room_name": "SA 301",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png"),
      "subject": "Computer Networking",
      "section": "BSIT 3",
      "schedule": "7:30-12:30"
    },
    {
      "id": 2,
      "room_name": "SA 302",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png"),
      "subject": "Computer Networking",
      "section": "BSIT 3",
      "schedule": "7:30-12:30"
    },
    {
      "id": 3,
      "room_name": "SA 303",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png"),
      "subject": "Computer Networking",
      "section": "BSIT 3",
      "schedule": "7:30-12:30"
    },
    {
      "id": 4,
      "room_name": "SA 304",
      "room_location": "St. Augustine Bldg",
      "room_description": "Computer Laboratory",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png"),
      "subject": "Computer Networking",
      "section": "BSIT 3",
      "schedule": "7:30-12:30"
    },
    {
      "id": 5,
      "room_name": "SA 305",
      "room_location": "St. Augustine Bldg",
      "room_description": "Lecture Room",
      "room_capacity": 30,
      "room_image": require("@/assets/images/_dummy-img.png"),
      "subject": "Computer Networking",
      "section": "BSIT 3",
      "schedule": "7:30-12:30"
    },
];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          gap: 20,
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
          // pagingEnabled
          // showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 20, paddingHorizontal: 20}}
          initialNumToRender={7}
          data={DATA}
          renderItem={({item, index}) => <BookedCard items={item} key={index}/>}
        />

        <View 
          style={{
            width: '100%', 
            flexDirection: "row", 
            justifyContent:"space-between", 
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <Text>{"Available Rooms"}</Text>
          <Pressable>
            <Text>{"See more"}</Text>
          </Pressable>
        </View>

        <FlatList
          data={DATA}
          renderItem={({item, index}) => <RooomCardIndex key={index} items={item}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          initialNumToRender={15}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
