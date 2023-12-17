type Props = {
  title: string;
};

const Title = ({ title }: Props) => (
  <h2 className="border-l-4 border-nord-3 pl-4 font-orbitron text-lg font-medium">
    {title}
  </h2>
);

export default Title;
