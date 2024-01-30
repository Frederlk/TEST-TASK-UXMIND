import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { toast } from '@/components/ui/use-toast';

type SearchGithubPepo = {
  value: number;
  label: string;
};

type GithubPepo = {
  id: number;
  name: string;
  htmlUrl: string;
  description: string;
  homepage: string;
  language: string;
  topics: string[];
  forks: number;
  watchers: number;
  stargazers_count: number;
  avatar_url: string;
  visibility: string;
};

const GITHUB_BASE_URL = 'https://api.github.com';

export const useSearchGitHubRepos = (query: string) => {
  const {
    data: repos,
    error: reposError,
    isLoading: isReposLoading,
  } = useQuery<SearchGithubPepo[], AxiosError>({
    queryKey: ['repo-search', query],
    retry: 1,
    enabled: !!(query && query.length >= 2),
    queryFn: async () => {
      const response = await axios.get(`${GITHUB_BASE_URL}/search/repositories`, {
        params: {
          q: query || '',
          per_page: 10,
        },
      });

      const results: SearchGithubPepo[] =
        response.data.items.map((item: any) => ({
          value: item.id,
          label: item.name,
        })) || [];

      return results;
    },
  });

  if (reposError) {
    toast({
      title: reposError.message,
      variant: 'destructive',
    });
  }

  return { repos, isReposLoading, reposError };
};

export const useGitHubRepoDetails = (repoId: number | null | undefined) => {
  const {
    data: repo,
    error: repoError,
    isLoading: isRepoLoading,
  } = useQuery<GithubPepo | null, AxiosError>({
    queryKey: ['repo-details', repoId],
    retry: 1,
    enabled: !!repoId,
    queryFn: async () => {
      const response = await axios.get(`${GITHUB_BASE_URL}/repositories/${repoId}`);

      const repo: GithubPepo | null = response.data
        ? {
            id: response.data.id,
            name: response.data.name,
            htmlUrl: response.data.url,
            description: response.data.description,
            homepage: response.data.homepage,
            language: response.data.language,
            topics: response.data.topics,
            forks: response.data.forks,
            watchers: response.data.watchers,
            stargazers_count: response.data.stargazers_count,
            avatar_url: response.data.avatar_url,
            visibility: response.data.visibility,
          }
        : null;

      return repo;
    },
  });

  if (repoError) {
    toast({
      title: repoError.message,
      variant: 'destructive',
    });
  }

  return { repo, isRepoLoading, repoError };
};
