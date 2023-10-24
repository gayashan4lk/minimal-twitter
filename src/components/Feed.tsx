"use client";

import { api } from "~/utils/api";
import { PostView } from "~/components/PostView";

export function Feed() {
  const { data: posts, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!posts) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {posts?.length === 0 && <div>No posts yet</div>}
      {posts?.map(({ post, author }) => (
        <PostView
          {...{
            post,
            author,
          }}
          key={post.id}
        />
      ))}
    </div>
  );
}
