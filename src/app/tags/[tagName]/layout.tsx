import { getTags } from '@/lib/microcms/tags';
import { toPathParameter } from '@/utils';

export type Params = {
  tagName: string;
};

type Props = {
  children: React.ReactNode;
};

// workaround for nested generateSTaticParams
// see https://github.com/vercel/next.js/issues/53717#issuecomment-1718987456
export const generateStaticParams = (): Promise<Params[]> => {
  return getTags().then((tags) =>
    tags.map((tag) => ({ tagName: toPathParameter(tag.name) })),
  );
};

const Layout = ({ children }: Props) => <>{children}</>;

export default Layout;
