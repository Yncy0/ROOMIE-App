import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const ProfileSkeletonLoader = () => (
  <ContentLoader viewBox="0 0 380 140" width={380} height={140}>
    <Circle cx="190" cy="50" r="50" />
    <Rect x="90" y="120" rx="4" ry="4" width="175" height="16" />
  </ContentLoader>
);

export default ProfileSkeletonLoader;
