import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getAllSeries } from '@/lib/getBlogInfo.mjs';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import { PageSEO } from '@/components/SEO';
import SeriesList from '@/components/SeriesList';

export const getStaticProps: GetStaticProps = async () => {
  const series = Object.values(await getAllSeries());
  return {
    props: { series },
  };
};

export default function SeriesPage({
  series,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {phrases.Series.title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {phrases.Series.description}
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <SeriesList series={series} />
            {/*
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
*/}
          </div>
        </div>
      </div>
    </>
  );
}
