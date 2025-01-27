import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";

type Props = {
  filterType: any;
  setFilterType: any;
};

const FilterButton = ({ filterType, setFilterType }: Props) => {
  const [isFocus, setIsFocus] = React.useState(false);

  const filterOptions = [
    { label: "ascend", value: "ascend" },
    { label: "descend", value: "descend" },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: primaryColor }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={filterOptions}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Filter" : "..."}
        value={filterType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setFilterType(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color={isFocus ? primaryColor : "black"}
            name="filter"
            size={14}
          />
        )}
      />
    </View>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minWidth: 120,
  },
  dropdown: {
    height: 25,
    // borderColor: "gray",
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
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
