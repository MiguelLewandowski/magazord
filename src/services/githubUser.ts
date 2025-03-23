export async function fetchGithubUser(username: string) {
  try {
    const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';
    
    const options: RequestInit = {};
    if (GITHUB_TOKEN) {
      options.headers = {
        Authorization: `token ${GITHUB_TOKEN}`
      };
    }
    
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      options
    );
    
    if (!response.ok) {  
      if (response.status === 403) {
        throw new Error("Limite de requisições da API do GitHub excedido. Adicione um token de acesso caso não tenha configurado ainda!");
      } else if (response.status === 404) {
        throw new Error(`Usuário '${username}' não encontrado no GitHub.`);
      } else {
        throw new Error(`Erro ao buscar usuário: ${response.status} ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuário do GitHub:", error);
    throw error;
  }
}