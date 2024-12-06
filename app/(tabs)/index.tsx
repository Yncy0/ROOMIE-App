import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { 
  Text, 
  View, 
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
  ScrollView
} from "react-native";
import { router } from "expo-router";
import Searchbar from "@/components/Searchbar";
import FilterButton from "@/components/FilterButton";
import BookedCard from "@/components/BookedCard";
import RoomCard from "@/components/RoomCard";
import { DATA } from "@/data/DATA";


export default function Index() {



  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: "center",
              width: '100%',
              padding: 20
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
              paddingHorizontal: 20,
              paddingBottom: 20
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 20, paddingHorizontal: 20, paddingBottom: 20}}
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
              paddingBottom: 20
            }}
          >
            <Text>{"Available Rooms"}</Text>
              <Pressable>
                <Text>{"See more"}</Text>
              </Pressable>
          </View>
          <FlatList
            data={DATA}
            renderItem={({item, index}) => 
              <RoomCard 
                key={index} 
                items={item} 
                onPress={() => 
                  router.replace({
                    pathname: '../screens/[roomPreview]',
                    params: {
                      roomName: item.room_name,
                      roomCategory: item.room_category,
                      roomImage: item.room_image
                    }
                  })}
              />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 20, paddingHorizontal: 20}}
            // pagingEnabled
            initialNumToRender={15}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
