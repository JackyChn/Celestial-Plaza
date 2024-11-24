import React from "react";

export default function Spinner() {
  return (
    <div
      className="mx-auto my-20 h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-400 border-t-transparent"
      style={{
        borderTopColor: "transparent",
        borderRadius: "50%",
      }}
    ></div>
  );
}
