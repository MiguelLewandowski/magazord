'use client'
import React from "react";
import styles from './tabs.module.css';
import { useTabStore } from "@/store/useTabStore";

const Tabs: React.FC = () => {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="blockTabs flex ">
    <div
      className={`styles.tabs ${activeTab === 1 ?  styles.activeTabs : ''}`}
      onClick={() => setActiveTab(1)}>
      Repositories
    </div>
    <div 
      className={`styles.tabs ${activeTab === 2 ?  styles.activeTabs : ''}`}
      onClick={() => setActiveTab(2)}>
      Starred</div>
  </div>
  );
};

export default Tabs;