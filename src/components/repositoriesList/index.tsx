import useRepoStore from "@/store/useRepoStore";
import React from "react";
import Link from "next/link";
import { FaStar, FaCodeBranch } from "react-icons/fa";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
  archived: boolean;
}

interface RepositoryListProps {
  repos: Repo[];
  isStarred?: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repos, isStarred = false }) => {
  const { searchRepo, activeTab, type, language } = useRepoStore();

  // Se estamos na tab starred, só mostra os repos favoritados se isStarred for verdadeiro || se estamos na repositories, só mostra os repos não favoritados se isStarred for falso
  if ((activeTab === "starred" && !isStarred) || (activeTab === "repositories" && isStarred)) {
    return null;
  }
  let reposToShow = repos;
  if (searchRepo) {
    reposToShow = repos.filter((repo) => {
      const searchLower = searchRepo.toLowerCase();
      const nameLower = repo.name.toLowerCase();
      const descriptionLower = repo.description?.toLowerCase() || "";

      return nameLower.includes(searchLower) || descriptionLower.includes(searchLower);
    });
  }

  if (type !== "all") {
    reposToShow = reposToShow.filter((repo) => {
      if (type === "source") return !repo.fork;
      if (type === "fork") return repo.fork;
      if (type === "archived") return repo.archived;
      return true;
    });
  }

  if (language !== "all") {
    reposToShow = reposToShow.filter((repo) => {
      return repo.language && repo.language.toLowerCase() === language.toLowerCase();
    });
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {reposToShow.length > 0 ? (
        <ul className="space-y-3 sm:space-y-4">
          {reposToShow.map((repo) => (
            <li key={repo.id} className="p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <Link
                href={`/repositories/${encodeURIComponent(repo.full_name)}`}
                className="text-sm sm:text-base md:text-xl block break-words hover:text-blue-600 transition-colors"
              >
                <span className="text-black">{repo.full_name.split("/")[0]}</span>
                <span className="text-black mx-1">/</span>
                <span className="text-blue-500 font-semibold">{repo.full_name.split("/")[1]}</span>
              </Link>
              <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-lg">{repo.description || "No description available"}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-black">
                {repo.language && isStarred && (
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-600 mr-1.5"></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center">
                  <FaStar className="mr-1.5 text-black w-4 h-4" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center">
                  <FaCodeBranch className="mr-1.5 text-black w-4 h-4" />
                  {repo.forks_count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-black py-4 sm:py-6 text-sm sm:text-base">Nenhum repositório encontrado.</p>
      )}
    </div>
  );
};

export default RepositoryList;