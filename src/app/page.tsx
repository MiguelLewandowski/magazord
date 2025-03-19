"use client";

import { useEffect, useState } from "react";
import { fetchGitHubUser } from "@/services/github";

export default function RepositoriesPage() {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    fetchGitHubUser("RaulLize").then(setUser);
  }, []);

  return (
    <div>
      <h1>Perfil do GitHub</h1>
      {user ? (
        <div>
          <img src={user.avatar_url} alt={user.login} width={100} />
          <p>Nome: {user.name}</p>
          <p>Bio: {user.bio}</p>
          <p>Repositórios públicos: {user.public_repos}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}