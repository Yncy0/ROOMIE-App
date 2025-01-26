import { View, Text } from "react-native";
import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const ScheduleSkeletonLoader = () => {
  return (
    <ContentLoader viewBox="0 0 500 100" width="100%" height={100}>
      <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100" />
    </ContentLoader>
  );
};

export default ScheduleSkeletonLoader;
