import { useQuery } from '@tanstack/react-query';

import { toast } from '@ui/use-toast';

import { fetcher } from '@lib/fetcher';

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
    data,
    error: reposError,
    isLoading: isReposLoading,
  } = useQuery({
    queryKey: ['repo-search', query],
    retry: 1,
    enabled: !!(query && query.length >= 2),
    queryFn: () => fetcher(`${GITHUB_BASE_URL}/search/repositories?q=${query || ''}&per_page=10`),
  });

  const repos: SearchGithubPepo[] =
    data?.items.map((item: any) => ({
      value: item.id,
      label: item.name,
    })) || [];

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
    data,
    error: repoError,
    isLoading: isRepoLoading,
  } = useQuery({
    queryKey: ['repo-details', repoId],
    retry: 1,
    enabled: !!repoId,
    queryFn: () => fetcher(`${GITHUB_BASE_URL}/repositories/${repoId}`),
  });

  const repo: GithubPepo | null = data
    ? {
        id: data.id,
        name: data.name,
        htmlUrl: data.url,
        description: data.description,
        homepage: data.homepage,
        language: data.language,
        topics: data.topics,
        forks: data.forks,
        watchers: data.watchers,
        stargazers_count: data.stargazers_count,
        avatar_url: data.avatar_url,
        visibility: data.visibility,
      }
    : null;

  if (repoError) {
    toast({
      title: repoError.message,
      variant: 'destructive',
    });
  }

  return { repo, isRepoLoading, repoError };
};
