export async function fetchGithubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error("Erro ao buscar repositórios");

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}