import { author } from '@/constants/author';
import { AiFillGithub } from 'react-icons/ai';

type Props = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const GitHubLink = ({ onClick }: Props) => (
  <a
    href={`https://github.com/${author.github}/ymmr.dev`}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className="rounded p-2 hover:bg-nord-1 focus:bg-nord-1 focus-visible:outline"
  >
    <AiFillGithub aria-label="GitHub repo" className="h-6 w-6 fill-nord-6" />
  </a>
);

export default GitHubLink;
