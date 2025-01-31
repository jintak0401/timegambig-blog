import React from 'react';
import NextImage from 'next/image';

import siteMetaData from 'data/site-metadata.mjs';

import ErrorBoundary from '@/components/common/error-boundary';
import Zoom from '@/components/image/zoom';

interface Props {
  src?: string;
  alt?: string;
}

const isVideo = (path?: string) => path && path.match(/\.(mp4|webm)$/);

const FallbackImage = ({ alt }: { alt: string }) => (
  <NextImage
    className="mx-auto w-auto max-w-full"
    src={siteMetaData.fallbackImage}
    alt={alt}
    width="1000"
    height="1000"
  />
);

const CustomMedia = ({ src, alt }: Props) => {
  const [src1, src2] = src?.split(',') || [];

  return (
    <figure className="my-12">
      {isVideo(src) ? (
        <video
          className="mx-auto w-auto max-w-full"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <ErrorBoundary fallback={<FallbackImage alt={alt as string} />}>
          <Zoom
            className={`mx-auto w-auto max-w-full${src2 ? ' dark:hidden' : ''}`}
            src={src1 as string}
            alt={alt as string}
            width="1000"
            height="1000"
          />
          {src2 && (
            <Zoom
              className="absolute top-0 mx-auto hidden w-auto max-w-full dark:block"
              src={src2 as string}
              alt={alt as string}
              width="1000"
              height="1000"
            />
          )}
        </ErrorBoundary>
      )}
      <figcaption className="middle-text text-center text-base italic">
        {alt}
      </figcaption>
    </figure>
  );
};

export default CustomMedia;
