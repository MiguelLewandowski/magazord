export async function fetchGitHubUser(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuário do GitHub:", error);
    return null;
  }
}