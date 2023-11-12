"use client";

import { api } from "~/utils/api";
import { PostView } from "~/components/PostView";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  id?: string;
};
export function Feed({ id }: Props) {
  const { data: posts, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <div className="mt-10 flex flex-col items-center">
        <LoadingSpinner size={24} />
      </div>
    );

  if (!posts) return <div>Something went wrong</div>;

  // If id is provided render posts only for that specific user
  if (id) {
    const userPosts = posts.filter((post) => {
      return post.author.id === id;
    });
    return (
      <div className="flex flex-col">
        {userPosts?.length === 0 && <div>No posts yet</div>}
        {userPosts?.map(({ post, author }) => (
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

  // If id is not provided render all posts
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

// TODO: This post filtering is not a good practice. I need to create a separate query to fetch posts by user
