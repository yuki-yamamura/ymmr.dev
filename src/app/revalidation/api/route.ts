import crypto from 'crypto';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  // microCMS webhook might send a signature as lowercase.
  // handling both lowercase and uppercase signature is good idea.
  // see https://document.microcms.io/manual/webhook-setting#hd95625726f
  const signature =
    headers().get('X-MICROCMS-Signature') ||
    headers().get('x-microcms-signature');

  if (signature === null) {
    throw new Error('Signature required.');
  }
  if (!process.env.MICROCMS_SIGNATURE) {
    throw new Error('Environment variable not found: MICROCMS_SIGNATURE');
  }

  const body = JSON.stringify(await request.json());
  const expectedSignature = crypto
    .createHmac('sha256', process.env.MICROCMS_SIGNATURE)
    .update(body)
    .digest('hex');

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    return NextResponse.json(
      {
        errorMessage: 'Invalid signature',
      },
      {
        status: 400,
      },
    );
  }

  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  if (tag === 'microcms') {
    revalidateTag(tag);
  }

  return NextResponse.json({
    date: new Date().toISOString(),
    revalidate: tag !== null,
    tag,
  });
};
