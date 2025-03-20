import React from "react";
import { FaSearch } from "react-icons/fa";

const Filters: React.FC = () => {
  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-3xl my-3">
      <div className="relative flex-grow">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Here"
          className="w-full pl-10 pr-4 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="relative">
        <select className="appearance-none pl-8 pr-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none cursor-pointer w-full">
          <option>Type</option>
        </select>
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 7 10 13 16 7" />
        </svg>
      </div>

      <div className="relative">
        <select className="appearance-none pl-8 pr-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none cursor-pointer w-full">
          <option>Language</option>
        </select>
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 7 10 13 16 7" />
        </svg>
      </div>
    </div>
  );
};

export default Filters;
