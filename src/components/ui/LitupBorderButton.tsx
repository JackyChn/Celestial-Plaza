import React from "react";

export const LitupBorderButton = ({
  children,
}: {
  children?: React.ReactNode;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <div className="group relative flex h-full w-[18vh] rounded-full bg-blue-600 px-6 py-1 text-white transition duration-200 hover:bg-blue-400">
      {children}
    </div>
  );
};
