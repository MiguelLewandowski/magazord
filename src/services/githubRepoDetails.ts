export async function fetchGithubRepoDetails(username: string, repo: string) {
  try {

    const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
    
    const options: RequestInit = {};
    if (GITHUB_TOKEN) {
      options.headers = {
        Authorization: `token ${GITHUB_TOKEN}`
      };
    }
      
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API Error:', response.status, errorData);
      
      if (response.status === 403) {
        throw new Error("Limite de requisições da API do GitHub excedido. Adicione um token de acesso caso não tenha configurado ainda!");
      } else if (response.status === 404) {
        throw new Error(`Repositório '${username}/${repo}' não encontrado no GitHub.`);
      } else {
        throw new Error(`Erro ao buscar repositório: ${response.status} ${response.statusText}`);
      }
    }

    const repoData = await response.json();
    return repoData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchRepoIssues(username: string, repo: string, per_page = 0) {
  try {

    const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
    
    const options: RequestInit = {};
    if (GITHUB_TOKEN) {
      options.headers = {
        Authorization: `token ${GITHUB_TOKEN}`
      };
    }
      
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/issues?state=open&per_page=${per_page}`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API Error:', response.status, errorData);
      
      if (response.status === 403) {
        throw new Error("Limite de requisições da API do GitHub excedido. Adicione um token de acesso caso não tenha configurado ainda!");
      } else if (response.status === 404) {
        throw new Error(`Issues para '${username}/${repo}' não encontradas no GitHub.`);
      } else {
        throw new Error(`Erro ao buscar issues: ${response.status} ${response.statusText}`);
      }
    }

    const issues = await response.json();
    return issues;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
