import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    // <div className={cn("max-w-screen-xl mx-auto px-10 py-5 outline outline-1 outline-red-500", className)}>
    <div className={cn("mx-auto px-5 py-5 outline outline-1 outline-red-500 md:px-10", className)}>
      {children}
    </div>
  );
};

export default Container;
