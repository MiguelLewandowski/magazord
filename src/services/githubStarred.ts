export async function fetchGitHubStarred(username: string) {
try {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
    
    const options: RequestInit = {};
    if (GITHUB_TOKEN) {
      options.headers = {
        Authorization: `token ${GITHUB_TOKEN}`
      };
    }

    let allStarred: any[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(
        `https://api.github.com/users/${username}/starred?per_page=100&page=${page}`,
        options
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Limite de requisições da API do GitHub excedido. Adicione um token de acesso caso não tenha configurado ainda!");
        } else if (response.status === 404) {
          throw new Error(`Usuário '${username}' não encontrado no GitHub.`);
        } else {
          throw new Error(`Erro ao buscar repositórios favoritos: ${response.status} ${response.statusText}`);
        }
      }

      const starred = await response.json();

      allStarred = [...allStarred, ...starred];

      if (starred.length < 100) {
        hasMorePages = false;
      } else {
        page++;
      }
    }

    return allStarred;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
