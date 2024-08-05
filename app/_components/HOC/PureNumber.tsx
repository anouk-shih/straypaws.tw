import React from "react";

interface PureNumberProps {
  title: string;
  keyName: string;
  number: number | string;
  info: string;
}

const PureNumber: React.FC<PureNumberProps> = ({ title, keyName, number, info }) => {
  return (
    <div className="card " data-key-name={keyName}>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="highlight mt-1 text-3xl font-semibold">{number}</p>
        <p className="mt-1 text-md ">{info}</p>
      </div>
    </div>
  );
};

export default PureNumber;
