import React from "react";

const Loader = (): React.JSX.Element => {
  return (
    <div className="w-full h-full items-center justify-center flex bg-white">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
