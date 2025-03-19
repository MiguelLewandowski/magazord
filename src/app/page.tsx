import { fetchGithubUser } from "@/services/githubUser";
import { fetchGithubRepos } from "@/services/githubRepos";
import { fetchGitHubStarred } from "@/services/githubStarred";

import Image from "next/image";
import RepositoriesList from "@/components/RepositoriesList";
import Tabs from "@/components/Tabs";

export default async function RepositoriesPage() {


  const username = "RaulLize";

  const user = await fetchGithubUser(username);
  const repos = await fetchGithubRepos(username);
  console.log(await fetchGithubRepos(username))
  const starred = await fetchGitHubStarred(username);

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
        <Tabs />

        <div className="features">
          <input className="inputSearch"></input>
          <select name="" id="" className="filters">Type</select>
          <select name="" id="" className="filters">Language</select>
        </div>

        <div className="boxRepositories">
          <RepositoriesList repos={repos} />
          <RepositoriesList repos={starred} isStarred={true} />
        </div>
      </div>
    </div>
  );
}