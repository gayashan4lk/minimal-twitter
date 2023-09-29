import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { RouterOutputs, api } from "~/utils/api";

dayjs.extend(relativeTime);

function CreatePostWizard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        className="h-14 w-14 rounded-full"
        src={user.imageUrl}
        width={64}
        height={64}
        alt={`profile image`}
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
}

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

function PostView(props: PostWithUser) {
  const { post, author } = props;

  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-700 p-4">
      <Image
        className="h-14 w-14 rounded-full"
        src={author.imageUrl}
        width={64}
        height={64}
        alt={`profile image`}
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1 text-sm  text-slate-300">
          <span className="font-semibold">{`@${author.userName}`}</span>
          <span>·</span>
          <span>{dayjs(post.createdAt).fromNow()}</span>
        </div>

        <span>{post.content}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-700 md:max-w-2xl">
          <div className="flex border-b border-slate-700 p-4">
            {user.isSignedIn ? (
              <CreatePostWizard />
            ) : (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {data?.length === 0 && <div>No posts yet</div>}
            {data?.map(({ post, author }) => (
              <PostView {...{ post, author }} key={post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
