import Link from 'next/link';
import { Github, Home } from 'lucide-react';

import { NotFound } from '@components/not-found';

import { Spinner } from '@ui/spinner';
import { Dialog, DialogContent } from '@ui/dialog';

import { useRepoModal } from '@hooks/use-repo-modal';
import { useGitHubRepoDetails } from '@hooks/use-github';

export const RepoModal = () => {
  const { isOpen, onClose, repoId } = useRepoModal();
  const { isRepoLoading, repo, repoError } = useGitHubRepoDetails(repoId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden border-none bg-neutral-800 p-0">
        <div className="space-y-4 p-4">
          {isRepoLoading ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Spinner />
            </div>
          ) : null}
          {repoError && !isRepoLoading ? <NotFound title={repoError?.message} /> : null}

          {repo ? (
            <>
              <h2 className="text-xl font-semibold text-primary">{repo.name}</h2>
              <p className="text-xs font-semibold text-neutral-400">{repo.description}</p>
              <div className="text-neutral-400">
                <ul className="list-disc pl-4 text-sm">
                  {repo.forks ? (
                    <li>
                      <b>Forks:</b> {repo.forks}
                    </li>
                  ) : null}
                  {repo.stargazers_count ? (
                    <li>
                      <b>Stars:</b> {repo.stargazers_count}
                    </li>
                  ) : null}
                  {repo.watchers ? (
                    <li>
                      <b>Watchers:</b> {repo.watchers}
                    </li>
                  ) : null}
                </ul>
              </div>
              {repo.language ? (
                <div className="text-sm text-neutral-400">
                  <b>Language:</b> {repo.language}
                </div>
              ) : null}
              {repo.topics.length ? (
                <div className="text-sm text-neutral-400">
                  <b>Topics:</b>{' '}
                  {repo.topics.map((topic) => (
                    <span className="after:content-[',_'] last:after:content-['.']" key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              ) : null}
              <div>
                {repo.htmlUrl ? (
                  <Link
                    href={repo.htmlUrl}
                    className="flex items-center gap-x-2 text-sm text-white hover:text-primary"
                    target="_blank"
                  >
                    <Github className="h-4 w-4" /> GitHub Link
                  </Link>
                ) : null}
                {repo.homepage ? (
                  <Link
                    href={repo.homepage}
                    className="flex items-center gap-x-2 text-sm text-white hover:text-primary"
                    target="_blank"
                  >
                    <Home className="h-4 w-4" /> Homepage Link
                  </Link>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
