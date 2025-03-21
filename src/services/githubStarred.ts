export async function fetchGitHubStarred(username: string) {
  //Tive que refazer a lógica do fetch pois a api do github nao entrega mais do que 100 repositorios por página
  //O padrão por página é 30, e acabei utilizando da doc em
  //https://docs.github.com/pt/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories para entender como funcionava melhor a api
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
