import ArticleHeader from './ArticleHeader';
import CommentsSection from './CommentsSection';
import Content from './Content';
import ReadMoreSection from './ReadMoreSection';

import type { Article } from '@/types/Article';

import 'prism-themes/themes/prism-nord.min.css';

type Props = {
  article: Article;
  previousArticle: Article | undefined;
  nextArticle: Article | undefined;
};

const ArticleScreen = async ({
  article,
  nextArticle,
  previousArticle,
}: Props) => {
  const { body, description } = article;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="mb-4 w-full md:mb-8">
        <ArticleHeader article={article} />
      </div>
      <main className="prose w-screen min-w-full bg-white px-4 py-6 md:w-full md:rounded-xl">
        <div>{description}</div>
        <Content body={body} />
      </main>
      <div className="mt-32 flex w-full flex-col gap-y-20">
        <CommentsSection />
        <ReadMoreSection
          nextArticle={nextArticle}
          previousArticle={previousArticle}
        />
      </div>
    </div>
  );
};

export default ArticleScreen;
