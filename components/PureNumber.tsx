import React from "react";

interface PureNumberProps {
  title: string;
  keyName: string;
  number: number | string;
  info: string;
}

const PureNumber: React.FC<PureNumberProps> = ({ title, keyName, number, info }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg" data-key-name={keyName}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{number}</p>
        <p className="mt-1 text-md ">{info}</p>
      </div>
    </div>
  );
};

export default PureNumber;
