import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFetchCourseName } from "@/hooks/queries/useFetchCourse";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";
import useFetchRooms from "@/hooks/queries/useFetchRooms";

type Props = {
  value: string | null;
  onChange: (value: string | null) => void;
};

const DropdownRooms = ({ value, onChange }: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  const { data } = useFetchRooms();
  const [courseData, setCourseData] = useState<any>([]);

  React.useEffect(() => {
    if (data) {
      const formattedData = (data ?? []).map((rooms) => ({
        label: rooms.room_name, // Adjust based on your data structure
        value: rooms.id, // Adjust based on your data structure
      }));
      setCourseData(formattedData);
    }
  }, [data]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Course and Section
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: primaryColor }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={courseData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Rooms" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color={isFocus ? primaryColor : "black"}
            name="layers"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownRooms;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
