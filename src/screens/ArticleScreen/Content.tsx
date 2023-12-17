import { processContent } from '@/lib/unified';

import type { Article } from '@/types/Article';

type Props = Pick<Article, 'body'>;

const Content = ({ body }: Props) => {
  return processContent(body);
};

export default Content;
