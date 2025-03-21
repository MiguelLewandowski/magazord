import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useRepoStore from "@/store/useRepoStore";

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

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-3xl my-3">
      <div className="relative flex-grow">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          onKeyUp={handleKeyPress}
          placeholder="Search Here"
          className="w-full pl-10 pr-4 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-600"
        />
      </div>

      <div className="relative">
        <select 
          value={type}
          onChange={handleTypeChange}
          className="appearance-none pl-8 pr-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none cursor-pointer w-full"
        >
          <option value="all">All Types</option>
          <option value="source">Source</option>
          <option value="fork">Fork</option>
          <option value="archived">Archived</option>
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
        <select 
          value={language}
          onChange={handleLanguageChange}
          className="appearance-none pl-8 pr-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none cursor-pointer w-full"
        >
          <option value="all">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language.toLowerCase()}>
              {language}
            </option>
          ))}
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
