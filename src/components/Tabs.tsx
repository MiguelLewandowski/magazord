'use client';
import React from "react";
import { useTabStore } from "@/store/useTabStore";
import { GoRepo, GoStar } from "react-icons/go";

interface TabsProps {
  repoCount: number;
  starredCount: number;
}

const Tabs: React.FC<TabsProps> = ({ repoCount, starredCount }) => {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="flex">
      <div
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer 
          ${activeTab === 1 ? "border-b-2 border-orange-400 text-black font-semibold" : "text-gray-500"}
        `}
        onClick={() => setActiveTab(1)}
      >
        <GoRepo size={20} className={`${activeTab === 1 ? "text-black" : "text-gray-400"}`} />
        <span>Repositories</span>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{repoCount}</span>
      </div>

      <div
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer 
          ${activeTab === 2 ? "border-b-2 border-orange-400 text-black font-semibold" : "text-gray-500"}
        `}
        onClick={() => setActiveTab(2)}
      >
        <GoStar size={20} className={`${activeTab === 2 ? "text-black" : "text-gray-400"}`} />
        <span>Starred</span>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{starredCount}</span>
      </div>
    </div>
  );
};

export default Tabs;