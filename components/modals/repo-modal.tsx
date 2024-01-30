import Link from 'next/link';
import { Github, Home } from 'lucide-react';

import { useRepoModal } from '@/hooks/use-repo-modal';
import { useGitHubRepoDetails } from '@/hooks/use-github';

import { Dialog, DialogContent } from '../ui/dialog';
import { NotFound } from '../not-found';
import { Spinner } from '../ui/spinner';

export const RepoModal = () => {
  const { isOpen, onClose, onOpen, repoId } = useRepoModal();
  const { isRepoLoading, repo, repoError } = useGitHubRepoDetails(repoId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-none bg-neutral-800 max-w-md p-0 overflow-hidden">
        <div className="space-y-4 p-4">
          {isRepoLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Spinner />
            </div>
          ) : null}
          {repoError && !isRepoLoading ? (
            <NotFound
              status={repoError?.response?.status}
              title={repoError?.response?.statusText}
            />
          ) : null}

          {repo ? (
            <>
              <h2 className="font-semibold text-xl text-primary">{repo.name}</h2>
              <p className="text-xs font-semibold text-neutral-400">{repo.description}</p>
              <div className="text-neutral-400">
                <ul className="pl-4 text-sm list-disc">
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
                    className="flex text-sm text-white gap-x-2 items-center hover:text-primary"
                    target="_blank"
                  >
                    <Github className="w-4 h-4" /> GitHub Link
                  </Link>
                ) : null}
                {repo.homepage ? (
                  <Link
                    href={repo.homepage}
                    className="flex text-sm text-white gap-x-2 items-center hover:text-primary"
                    target="_blank"
                  >
                    <Home className="w-4 h-4" /> Homepage Link
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
