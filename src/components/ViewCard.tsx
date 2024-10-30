import React, { ReactNode } from "react";

interface ViewCardProps {
  children: ReactNode;
  className?: string;
}

const ViewCard = ({
  children,
  className = "",
}: ViewCardProps): React.JSX.Element => {
  return (
    <div
      className={`flex w-full items-center justify-center h-full ${className}`}
    >
      {children}
    </div>
  );
};

export default ViewCard;
