"use client";
import Image from "next/image";
import useRepoStore from "@/store/useRepoStore";
import Tabs from "@/components/tabs";
import Filters from "@/components/filters";
import RepositoriesList from "@/components/repositoriesList";
import {
  useGithubUser,
  useGithubRepos,
  useGithubStarred,
} from "@/hooks/useGithubData";
import Header from "@/components/header";
import { GoLocation, GoChevronDown } from "react-icons/go";


export default function RepositoriesPage() {
  // Coloque aqui o usuário do github que deseja ver os dados
  const username = "bradtraversy";

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
      <div className="container mx-auto px-3 lg:px-35 py-6 sm:py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10 xl:gap-16">
          {user ? (
            <>
              <div className="w-full md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
                <div className="flex flex-col items-center">
                  <Image
                    src={user.avatar_url}
                    className="rounded-full mb-2"
                    alt={user.login}
                    width={180}
                    height={180}
                    sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
                  />
                  <div className="mt-4 text-center mb-5">
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold">{user.name}</p>
                    <p className="mt-1 text-sm sm:text-base text-gray-500">{user.bio}</p>
                  </div>
                  
                  <div className="w-full mt-4 md:hidden">
                    <details className="w-full group">
                      <summary className="flex flex-col justify-center items-center text-blue-500 cursor-pointer py-2 rounded-md list-none font-medium">
                        <span>Informações Adicionais</span>
                        <span className="mt-1 transform transition-transform duration-300 group-open:rotate-180">
                          <GoChevronDown className="h-4 w-4" />
                        </span>
                      </summary>
                      <div className="pt-4 flex flex-col items-center animate-fadeIn">
                        <p className="text-sm sm:text-base">Repositórios públicos: {user.public_repos}</p>
                        {user.location && (
                          <div className="flex items-center mt-3">
                            <GoLocation className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2" />
                            <span className="text-xs sm:text-sm text-gray-600">{user.location}</span>
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                  
                  <div className="hidden md:block mt-4">
                    <p className="text-sm md:text-base">Repositórios públicos: {user.public_repos}</p>
                    {user.location && (
                      <div className="flex justify-center items-center mt-3">
                        <GoLocation className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2" />
                        <span className="text-xs md:text-sm text-gray-600">{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Carregando...</p>
          )}

          <div className="flex-1 flex flex-col gap-4 sm:gap-7">
            <Tabs repoCount={repos.length} starredCount={starred.length} />
            <Filters repos={allRepos} />
            <div className="mt-2 sm:mt-4">
              <RepositoriesList
                repos={activeTab === "repositories" ? repos : starred}
                isStarred={activeTab === "starred"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
