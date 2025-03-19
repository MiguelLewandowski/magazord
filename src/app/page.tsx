"use client";

import { useEffect, useState } from "react";
import { fetchGithubUser } from "@/services/githubUser";
import { fetchGithubRepos } from "@/services/githubRepos";
import Image from "next/image";

export default function RepositoriesPage() {
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any>(null);

  useEffect(() => {
    fetchGithubUser("RaulLize").then(setUser);
    console.log(fetchGithubUser("RaulLize"))
    fetchGithubRepos("RaulLize").then(setRepos);
    console.log(fetchGithubRepos("RaulLize"))
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
          <div className="blockTabs flex ">
            <div className="tab">Repositories</div>
            <div className="tab">Starred</div>
          </div>

          <div className="features">
            <input className="inputSearch"></input>
            <select name="" id="" className="filters">Type</select>
            <select name="" id="" className="filters">Language</select>
          </div>

          <div className="boxRepositories">


          </div>
      </div>
    </div>
  );
}