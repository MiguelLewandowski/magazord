'use client'

import { fetchGithubUser } from "@/services/githubUser";
import { fetchGithubRepos } from "@/services/githubRepos";
import { fetchGitHubStarred } from "@/services/githubStarred";

import Image from "next/image";
import RepositoriesList from "@/components/RepositoriesList";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";

export default function RepositoriesPage() {


  const username = "RaulLize";

  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [starred, setStarred] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(1); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchGithubUser(username);
        const userRepos = await fetchGithubRepos(username);
        const userStarred = await fetchGitHubStarred(username);

        setUser(userData);
        setRepos(userRepos);
        setStarred(userStarred);
      } catch (error) {
        console.error("Erro ao carregar os dados", error);
      }
    };

    loadData(); 
  }, []);

  return (
    <div className="mt-5 flex gap-40">
      {user ? (
        <div className="cardUser">
          <Image src={user.avatar_url} className="rounded-full" alt={user.login} width={150} height={150} />
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
        <Tabs onTabChange={setActiveTab}/>

        <div className="features">
          <input className="inputSearch"></input>
          <select name="" id="" className="filters">Type</select>
          <select name="" id="" className="filters">Language</select>
        </div>

        <div className="boxRepositories">
        {activeTab === 1 && <RepositoriesList repos={repos} />}
        {activeTab === 2 && <RepositoriesList repos={starred} isStarred={true} />}
        </div>
      </div>
    </div>
  );
}