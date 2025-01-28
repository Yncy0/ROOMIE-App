import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFetchSubjects } from "@/hooks/useFetchSubject";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";

type DropdownSubjectProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

const DropdownSubject = ({ value, onChange }: DropdownSubjectProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const { data } = useFetchSubjects();
  const [subjectData, setSubjectData] = useState<any>([]);

  React.useEffect(() => {
    if (data) {
      const formattedData = (data ?? []).map((subject) => ({
        label: subject.subject_code, // Adjust based on your data structure
        value: subject.subject_code, // Adjust based on your data structure
      }));
      setSubjectData(formattedData);
    }
  }, [data]);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Subject
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
        data={subjectData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Subject" : "..."}
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
            name="book"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownSubject;

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
