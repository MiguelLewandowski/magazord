import React from 'react';
import { fetchGithubRepoDetails } from '@/services/githubRepoDetails';

type PageParams = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageParams) {
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);
  
  const [username, repo] = decodedSlug.split('/');
  
  const repoData = await fetchGithubRepoDetails(username, repo);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do repositório</h1>
      <p>Repositório: {username}/{repo}</p>
      
      {repoData ? (
        <div>
          <p>Stars: {repoData.stargazers_count}</p>
          <p>Forks: {repoData.forks_count}</p>
          <p>Issues abertas: {repoData.open_issues_count}</p>
        </div>
      ) : (
        <p>Não conseguimos carregar os dados do repositório.</p>
      )}
    </div>
  );
}
