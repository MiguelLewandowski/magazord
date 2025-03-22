export async function fetchGithubRepos(username: string) {
try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''; 
    
    let allRepos: any[] = [];
    let page = 1;
    let hasMorePages = true;

    const options: RequestInit = {};
    if (GITHUB_TOKEN) {
      options.headers = {
        Authorization: `token ${GITHUB_TOKEN}`
      };
    }

    while (hasMorePages) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        options
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('GitHub API Error:', response.status, errorData);
        
        if (response.status === 403) {
              throw new Error("Limite de requisições da API do GitHub excedido. Adicione um token de acesso caso não tenha configurado ainda!");
        } else if (response.status === 404) {
          throw new Error(`Usuário '${username}' não encontrado no GitHub.`);
        } else {
          throw new Error(`Erro ao buscar repositórios: ${response.status} ${response.statusText}`);
        }
      }

      const repos = await response.json();

      allRepos = [...allRepos, ...repos];

      if (repos.length < 100) {
        hasMorePages = false;
      } else {
        page++;
      }
    }

    return allRepos;
  } catch (error) {
    console.error(error);
    throw error; // Propagar o erro para que o componente possa lidar com ele
  }
}
