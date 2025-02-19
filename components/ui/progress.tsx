import React from "react";

interface Progress{
  value:number;
  color:string;
  height:string

}
const ProgressBar: React.FC<Progress> =({ value, color = "#01805C", height = "h-2" }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${height}`}>
      <div
        className="rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${value}%`,
          backgroundColor: color,
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
