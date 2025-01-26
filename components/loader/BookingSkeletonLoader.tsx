import { View, Text } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const BookingSkeletonLoader = () => {
  return (
    <ContentLoader viewBox="0 0 300 150" width={300} height={150}>
      <Rect x="0" y="0" rx="3" ry="3" width="300" height="150" />
    </ContentLoader>
  );
};

export default BookingSkeletonLoader;
