"use client";

import LinearProgress from "@mui/material/LinearProgress";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <LinearProgress className="w-32 md:w-52" color="secondary" />
    </div>
  );
};

export default Loading;
