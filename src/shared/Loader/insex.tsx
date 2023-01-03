import React from "react";
import { FC } from "react";
import ContentLoader from "react-content-loader";

interface LoaderProps {
  height: string;
  width: string;
}

const Loader: FC<LoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width={props.width}
    height={props.height}
    // viewBox="0 0 400 160"
    backgroundColor="#472a85"
    foregroundColor="#473175"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width={props.width} height={props.height} />
  </ContentLoader>
);

export default Loader;
