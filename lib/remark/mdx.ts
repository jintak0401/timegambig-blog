import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import remarkCodeTitles from '@/lib/remark/remark-code-title';
import remarkImgToJsx from '@/lib/remark/remark-img-to-jsx';
import { FileType, PostItems } from '@/lib/types';

const root = process.cwd();

const FILE_PATH = path.join(root, 'posts');

export const dateSortDesc = (a: string, b: string) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

export const formatSlug = (slug: string) => slug.replace(/\.mdx$/, '');

export async function mdxToHtml(source: string, data: PostItems) {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkImgToJsx,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['activeSection'],
            },
            content: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: 20,
                  height: 20,
                  fill: 'currentColor',
                  viewBox: '0 0 24 24',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      d: 'M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
        rehypeKatex,
        rehypePrismPlus,
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ],
      format: 'mdx',
    },
    scope: data,
  });
}

export const getFileSlugs = (type: FileType): string[] => {
  return fs.readdirSync(path.join(FILE_PATH, type));
};

export const getContentBySlug = async (type: FileType, slug: string) => {
  const postFilePath = path.join(FILE_PATH, type, `${formatSlug(slug)}.mdx`);

  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await mdxToHtml(content, data);

  const frontMatter = {
    ...data,
    slug,
  };

  return {
    source: mdxSource,
    frontMatter,
  };
};

export const getAllPosts = () => {
  const slugs = getFileSlugs('blog');

  return slugs
    .map((slug) => {
      const source = fs.readFileSync(
        path.join(FILE_PATH, 'blog', slug),
        'utf-8'
      );

      const { data: frontMatter } = matter(source);
      return {
        ...frontMatter,
        slug: formatSlug(slug),
        date: new Date(frontMatter.date).toISOString(),
      };
    })
    .sort((a, b) => dateSortDesc(a.date, b.date));
};
