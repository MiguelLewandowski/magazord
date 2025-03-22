import useRepoStore from "@/store/useRepoStore";
import React from "react";
import Link from "next/link";

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
    <div className="space-y-6">
      {reposToShow.length > 0 ? (
        <ul className="space-y-4">
          {reposToShow.map((repo) => (
            <li key={repo.id} className="p-4 ">
              <Link
                href={`/repositories/${repo.full_name.split("/")[1]}`}
                className="text-lg"
              >
                {repo.full_name.split("/")[0]}{" / "}
                <span className="text-blue-500 font-semibold">{repo.full_name.split("/")[1]}</span>
              </Link>
              <p className="text-gray-600 mt-1">{repo.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                {<span>{repo.language}</span>}
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Nenhum repositório encontrado.</p>
      )}
    </div>
  );
};

export default RepositoryList;