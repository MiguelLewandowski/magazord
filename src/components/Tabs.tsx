'use client';
import React from "react";
import useRepoStore from "@/store/useRepoStore";
import { GoRepo, GoStar } from "react-icons/go";

interface TabsProps {
  repoCount: number;
  starredCount: number;
}

const Tabs: React.FC<TabsProps> = ({ repoCount, starredCount }) => {
  const { activeTab, setActiveTab } = useRepoStore();

  return (
    <div className="flex">
      <div
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer 
          ${activeTab === 'repositories' ? "border-b-2 border-orange-400 text-black font-semibold" : "text-gray-500"}
        `}
        onClick={() => setActiveTab('repositories')}
      >
        <GoRepo size={20} className={`${activeTab === 'repositories' ? "text-black" : "text-gray-400"}`} />
        <span>Repositories</span>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{repoCount}</span>
      </div>

      <div
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer 
          ${activeTab === 'starred' ? "border-b-2 border-orange-400 text-black font-semibold" : "text-gray-500"}
        `}
        onClick={() => setActiveTab('starred')}
      >
        <GoStar size={20} className={`${activeTab === 'starred' ? "text-black" : "text-gray-400"}`} />
        <span>Starred</span>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{starredCount}</span>
      </div>
    </div>
  );
};

export default Tabs;