import React from "react";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}
interface RepositoryListProps {
  repos: Repo[];
  isStarred?: boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repos, isStarred = false }) => {
  return (
    <div className="space-y-6">
      {repos.length > 0 ? (
        <ul className="space-y-4">
          {repos.map((repo) => (
            <li key={repo.id} className="p-4 ">
              <a
                href={repo.html_url}
                target="_blank"
                className="text-lg"
              >
                {repo.full_name.split("/")[0]}{" / "}
                <span className="text-blue-500 font-semibold">{repo.full_name.split("/")[1]}</span>
              </a>

              <p className="text-gray-600 text-sm mt-1">
                {repo.description || "Sem descrição"}
              </p>

              <div className="flex items-center space-x-4 text-gray-700 mt-2">
                {isStarred ? (
                  <p className="text-sm">{repo.language || "Não especificado"}</p>
                ) : (
                  <>
                    <p className="flex items-center space-x-1">
                      ⭐ <span className="font-semibold">{repo.stargazers_count}</span>
                    </p>
                    <p className="flex items-center space-x-1">
                      🔁 <span className="font-semibold">{repo.forks_count}</span>
                    </p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum repositório encontrado.</p>
      )}
    </div>
  );
};

export default RepositoryList;