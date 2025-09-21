import React, { FC } from "react";
import { Card } from "../ui/card";

const PropertyItemSkeleton: FC = () => {
  return (
    <Card className="w-[360px] h-[430px] bg-white rounded-2xl shadow-lg overflow-hidden py-0 animate-pulse">
      <div className="h-[60%] relative overflow-hidden bg-gray-200">
        <div className="absolute top-3 right-3 w-14 h-6 bg-gray-300 rounded-md"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-200 to-transparent h-24 pointer-events-none"></div>
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
        <div className="mt-3 h-10 w-full bg-gray-300 rounded-xl"></div>
      </div>
    </Card>
  );
};

export default PropertyItemSkeleton;
