import Link from 'next/link';

const Navigation = () => (
  <div className="flex justify-center">
    <Link
      href="/articles"
      className="text-nord-10 hover:underline focus:underline"
    >
      すべての記事を見る →
    </Link>
  </div>
);

export default Navigation;
