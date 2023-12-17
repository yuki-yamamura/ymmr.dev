'use client';

import { giscus } from '@/constants/siteConfig';
import { useEffect } from 'react';

const Comments = () => {
  useEffect(() => {
    const { repository, repositoryId, category, categoryId } = giscus;
    const script = document.createElement('script');

    script.async = true;
    script.setAttribute('src', 'https://giscus.app/client.js');
    script.setAttribute('data-repo', repository);
    script.setAttribute('data-repo-id', repositoryId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');

    const commentsDiv = document.getElementById('comments');
    commentsDiv?.appendChild(script);
  }, []);

  return <div id="comments"></div>;
};

export default Comments;
