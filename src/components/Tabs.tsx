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
    <div className="flex w-full border-b border-gray-200 text-sm md:text-base lg:text-lg">
      <div
        className={`flex items-center justify-center gap-2 py-3 px-4 cursor-pointer w-1/2 sm:w-1/2 lg:w-auto
          ${activeTab === 'repositories' ? "border-b-2 border-orange-400 text-black font-semibold" : "text-gray-500"}
        `}
        onClick={() => setActiveTab('repositories')}
      >
        <GoRepo size={16} className={activeTab === 'repositories' ? "text-black" : "text-gray-400"} />
        <span>Repositories</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{repoCount}</span>
      </div>

      <div
        className={`flex items-center justify-center gap-2 py-3 px-4 cursor-pointer w-1/2 sm:w-1/2 lg:w-auto
          ${activeTab === 'starred' ? "border-b-2 border-orange-400 text-black font-semibold" : "text-gray-500"}
        `}
        onClick={() => setActiveTab('starred')}
      >
        <GoStar size={16} className={activeTab === 'starred' ? "text-black" : "text-gray-400"} />
        <span>Starred</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{starredCount}</span>
      </div>
    </div>
  );
};

export default Tabs;