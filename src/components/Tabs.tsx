'use client'
import React, { useState } from "react";
import styles from './tabs.module.css';

interface TabsProps {

}

const Tabs: React.FC<TabsProps> = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index)
  }
  return (
    <div className="blockTabs flex ">
    <div
      className={`styles.tabs ${toggleState === 1 ?  styles.activeTabs : ''}`}
      onClick={() => toggleTab(1)}>
      Repositories
    </div>
    <div 
      className={`styles.tabs ${toggleState === 2 ?  styles.activeTabs : ''}`}
      onClick={() => toggleTab(2)}>
      Starred</div>
  </div>
  );
};

export default Tabs;