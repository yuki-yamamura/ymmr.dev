type Props = {
  name: string;
  size: 'small' | 'base' | 'large';
};

const Badge = ({ name, size }: Props) => {
  // collection for TailwindCSS's font sizes
  const fontSizes = {
    small: 'text-sm',
    base: 'text-base',
    large: 'text-lg',
  };
  const fontSize = fontSizes[size];

  return (
    <div
      className={`inline-flex h-6 items-center justify-center rounded-full bg-nord-3 px-4 pb-[2px] font-medium text-nord-6
      ${fontSize}`}
    >
      {name}
    </div>
  );
};

export default Badge;
