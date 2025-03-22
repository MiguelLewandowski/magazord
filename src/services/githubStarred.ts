export async function fetchGitHubStarred(username: string) {
try {
    let allStarred: any[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(
        `https://api.github.com/users/${username}/starred?per_page=100&page=${page}`
      );

      if (!response.ok)
        throw new Error("Erro ao buscar repositórios favoritos");

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
    return [];
  }
}
