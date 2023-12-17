import { author } from '@/constants/author';
import Image from 'next/image';

const Footer = () => (
  <footer
    className={
      'relative bottom-0 flex h-16 flex-col items-center justify-center text-nord-6'
    }
  >
    <Image
      src="/assets/images/footer-background.svg"
      fill
      style={{ objectFit: 'cover' }}
      alt=""
      aria-hidden
    />
    <div className="z-10">@ 2024 YUKI YAMAMURA</div>
    <a
      href={`mailto:${author.email}`}
      target="_blank"
      rel="noopener noreferrer"
      className="z-10 text-sm underline hover:text-nord-9"
    >
      {author.email}
    </a>
  </footer>
);

export default Footer;
