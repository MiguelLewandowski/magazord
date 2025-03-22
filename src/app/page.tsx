"use client";
import Image from "next/image";
import useRepoStore from "@/store/useRepoStore";
import RepositoriesList from "@/components/RepositoriesList";
import Tabs from "@/components/Tabs";
import Filters from "@/components/Filters";
import {
  useGithubUser,
  useGithubRepos,
  useGithubStarred,
} from "@/hooks/useGithubData";
import Header from "@/components/header/Header";

export default function RepositoriesPage() {
  // Coloque aqui o usuário do github que deseja ver os dados
  const username = "torvalds";

  const { activeTab } = useRepoStore();

  const userQuery = useGithubUser(username);
  const reposQuery = useGithubRepos(username);
  const starredQuery = useGithubStarred(username);

  const user = userQuery.data;
  const repos = reposQuery.data || [];
  const starred = starredQuery.data || [];

  const allRepos = [...repos, ...starred];

  const isLoading =
    userQuery.isLoading || reposQuery.isLoading || starredQuery.isLoading;

  if (isLoading) {
    return <p className="text-center mt-10">Carregando dados do GitHub...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-10">Erro ao carregar dados do usuário.</p>
    );
  }

  return (
    <>
      <div className="w-full">
        <Header />
      </div>
      <div className="container mx-auto mt-10 flex gap-40">
        {user ? (
          <div className="cardUser">
            <Image
              src={user.avatar_url}
              className="rounded-full"
              alt={user.login}
              width={150}
              height={150}
            />
            <div className="mt-2 text-center">
              <p className="text-3xl font-semibold">{user.name}</p>
              <p className="mt-1 text-gray-500">{user.bio}</p>
            </div>

            <p>Repositórios públicos: {user.public_repos}</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}

        <div className="mainContent flex flex-col gap-5">
          <Tabs repoCount={repos.length} starredCount={starred.length} />
          <Filters repos={allRepos} />
          <div className="boxRepositories">
            <RepositoriesList
              repos={activeTab === "repositories" ? repos : starred}
              isStarred={activeTab === "starred"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
