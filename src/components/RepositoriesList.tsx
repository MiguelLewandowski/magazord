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

interface RepositoryListProps {
  repos: Repo[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({repos, isStarred = false }) => {
  return (
    <div className="">
      {repos.length > 0 ? (
        <ul className="">
          {repos.map((repo) => (
            <li key={repo.id} className="">
              <a href={repo.html_url} target="_blank" className="">
                {repo.full_name} 
              </a>
              <p className="">{repo.description || "Sem descrição"}</p>
              {isStarred ? `${repo.language || "Não especificado"} | ${repo.forks_count}`  : `⭐ ${repo.stargazers_count} | 🔁 ${repo.forks_count}`}
            </li>
          ))}
        </ul>
      ) : (
        <p className="">Nenhum repositório encontrado.</p>
      )}
    </div>
  );
};

export default RepositoryList;