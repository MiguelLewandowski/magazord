export async function fetchGithubRepoDetails(username: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}`
    );

    if (!response.ok) throw new Error("Erro ao buscar repositório");

    const repoData = await response.json();
    return repoData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
