"use client";

import { useEffect, useState } from "react";
import { fetchGitHubUser } from "@/services/github";
import Image from "next/image";

export default function RepositoriesPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchGitHubUser("RaulLize").then(setUser);
    console.log(fetchGitHubUser("RaulLize"))
  }, []);

  return (
    <div>
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
    </div>
  );
}