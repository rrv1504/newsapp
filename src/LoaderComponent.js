import React from "react";
import { Oval } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      <Oval
        height={50}
        width={50}
        color="#0d6efd"
        secondaryColor="#a8d0ff"
        strokeWidth={5}
      />
    </div>
  );
};

export default LoaderComponent;
