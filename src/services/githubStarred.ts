export async function fetchGitHubStarred(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/starred`);
    if (!response.ok) throw new Error("Erro ao buscar repositórios favoritos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}