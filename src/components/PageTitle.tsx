type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => (
  <h1 className="font-orbitron text-3xl font-bold md:text-4xl">{title}</h1>
);

export default PageTitle;
