import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useRepoStore from "@/store/useRepoStore";
import Select from "@/components/selectFilter";

interface FiltersProps {
  repos: any[];
}

const Filters: React.FC<FiltersProps> = ({ repos }) => {
  const { searchInput, type, language, setFilters, submitSearch, setType, setLanguage } = useRepoStore();
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (repos && repos.length > 0) {
      const foundLanguages: string[] = [];
      
      repos.forEach((repo) => {
        if (repo.language && !foundLanguages.includes(repo.language)) {
          foundLanguages.push(repo.language);
        }
      });
      
      setLanguages(foundLanguages);
    }
  }, [repos]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchInput: e.target.value });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitSearch();
    }
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const typeOptions = [
    { value: "all", label: "Type" },
    { value: "source", label: "Source" },
    { value: "fork", label: "Fork" },
    { value: "archived", label: "Archived" }
  ];

  const languageOptions = [
    { value: "all", label: "Language" },
    ...languages.map(lang => ({ value: lang.toLowerCase(), label: lang }))
  ];

  return (
    <div className="w-full my-2 sm:my-3 md:my-2">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="order-2 lg:order-1 mt-3 lg:mt-0 lg:flex-grow relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            onKeyUp={handleKeyPress}
            placeholder="Search Here"
            className="w-full pl-10 pr-4 py-2 text-base border-b border-gray-200 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="order-1 lg:order-2 flex gap-3 justify-start lg:justify-end w-full lg:w-auto">
          <Select
            value={type}
            onChange={handleTypeChange}
            options={typeOptions}
            width="narrow"
          />

          <Select
            value={language}
            onChange={handleLanguageChange}
            options={languageOptions}
            width="wide"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
