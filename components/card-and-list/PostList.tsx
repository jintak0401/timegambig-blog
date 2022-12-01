import { PostListItem } from '@/lib/types';

import phrases from '@/data/phrases';

import PostCard from '@/components/card-and-list/PostCard';

interface Props {
  posts: PostListItem[];
}

const PostList = ({ posts }: Props) => {
  return (
    <ul>
      {!posts.length && phrases.Blog.noPost}
      {posts.map((post) => (
        <li key={post.title}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;