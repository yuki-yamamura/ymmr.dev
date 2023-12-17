import Title from './Title';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: Props) => (
  <section className="flex flex-col gap-y-6">
    <Title title={title} />
    {children}
  </section>
);

export default Section;
