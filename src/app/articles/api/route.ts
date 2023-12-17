import { MICROCMS_CONTENTS_LIMIT } from '@/constants/siteConfig';
import { getArticles } from '@/lib/microcms/articles';
import { NextResponse } from 'next/server';

import type { Article } from '@/types/Article';

export type ResponseData = Pick<Article, 'id' | 'title'>[];

export const GET = async (
  request: Request,
): Promise<NextResponse<ResponseData>> => {
  const { searchParams } = new URL(request.url);
  const q = searchParams.getAll('q');
  const limit = searchParams.get('limit');

  const articles = await getArticles({
    fields: ['id', 'title'],
    limit: limit ? parseInt(limit) : MICROCMS_CONTENTS_LIMIT,
    offset: 0,
    q: q.join(','),
  });

  return NextResponse.json(articles);
};
