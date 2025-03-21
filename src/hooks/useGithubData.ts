import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "@/services/githubUser";
import { fetchGithubRepos } from "@/services/githubRepos";
import { fetchGitHubStarred } from "@/services/githubStarred";

// Busca dados do usuário
export function useGithubUser(username: string) {
  const result = useQuery({
    queryKey: ["githubUser", username],
    queryFn: async () => {
      return fetchGithubUser(username);
    },
    enabled: username !== "",
  });
  return result;
}

// Busca repositórios
export function useGithubRepos(username: string) {
    const result = useQuery({
      queryKey: ["githubRepos", username],
      queryFn: async () => {
        return fetchGithubRepos(username);
      },
      enabled: username !== "",
    });
    
    return result;
  }

// Busca repositórios favoritos
export function useGithubStarred(username: string) {
    const result = useQuery({
      queryKey: ["githubStarred", username],
      queryFn: async () => {
        return fetchGitHubStarred(username);
      },
      enabled: username !== "",
    });
    
    return result;
  }
