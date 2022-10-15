import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';

import { pick, sortedBlogPost } from '@/lib/contentlayer';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import { PageSEO } from '@/components/SEO';

import ListLayout from '@/layouts/ListLayout';

export const getStaticProps = async () => {
  const posts = sortedBlogPost(allBlogs)
    .filter(({ draft }) => !draft)
    .map((post) =>
      pick(post, ['title', 'slug', 'date', 'tags', 'summary', 'images'])
    );

  return {
    props: {
      posts,
    },
  };
};

export default function BlogPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts}
        /*
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
*/
        title={phrases.Blog.title}
        description={phrases.Blog.description}
      />
    </>
  );
}