'use client';

import mediumZoom from 'medium-zoom';
import { useRef } from 'react';

import type { Zoom } from 'medium-zoom';

type Props = Pick<
  React.ComponentPropsWithoutRef<'img'>,
  'src' | 'alt' | 'height' | 'width'
>;

const CustomImage = ({ src, alt, height, width }: Props) => {
  const zoomRef = useRef<Zoom | null>(null);

  const toggleZoom = (image: HTMLImageElement | null) => {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: '#ECEFF4', // Nord 6
      });
    }
    const zoom = zoomRef.current;

    if (image) {
      zoom.attach(image);
    } else {
      zoom.detach();
    }
  };

  return (
    <img src={src} height={height} width={width} alt={alt} ref={toggleZoom} />
  );
};

export default CustomImage;
