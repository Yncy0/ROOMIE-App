import { View, Text } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const RoomSkeletonLoader = () => {
  return (
    <ContentLoader viewBox="0 0 230 290" width={230} height={290}>
      <Rect x="0" y="0" rx="3" ry="3" width="230" height="290" />
    </ContentLoader>
  );
};

export default RoomSkeletonLoader;
