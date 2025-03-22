export async function fetchGithubRepos(username: string) {
try {
    let allRepos: any[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
      );

      if (!response.ok) throw new Error("Erro ao buscar repositórios");

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
    return [];
  }
}
