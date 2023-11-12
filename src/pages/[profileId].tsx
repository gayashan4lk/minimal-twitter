import Head from "next/head";
import Link from "next/link";
import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import ProfileImage from "~/components/ProfileImage";
import { Feed } from "~/components/Feed";

export async function getStaticProps(context: GetStaticPropsContext) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });
  const slug = context.params?.profileId as string;

  if (!slug) throw new Error("ProfileId not found");

  const profileId = slug.slice(1).toString();

  await helpers.profile.getUserByUserName.prefetch({ userName: profileId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      profileId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default function ProfileView(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { profileId } = props;

  const { data: user } = api.profile.getUserByUserName.useQuery({
    userName: profileId,
  });

  if (!user) return <div>404</div>;

  const { id, firstName, lastName, imageUrl, userName } = user;

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Minimal twitter profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="border-b border-slate-700 py-3">
          <Link href="/" className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.0}
              stroke="currentColor"
              className="inline h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <h1 className="inline align-middle text-2xl font-bold">
            {firstName} {lastName}
          </h1>
        </div>
        <div className="relative">
          <div className="mb-[64px] flex h-[130px] bg-emerald-600"></div>
          <div className="absolute bottom-[-64px] pl-5">
            <ProfileImage
              imageUrl={imageUrl}
              size={128}
              borderStyles="border-4 border-slate-800"
            />
          </div>
        </div>
        <div className="border-b border-slate-700 py-2 pl-5">
          <h1 className="text-2xl font-bold">
            {firstName} {lastName}
          </h1>
          <h4 className="text-slate-400">{`@${userName}`}</h4>
        </div>
        <Feed id={id} />
      </>
    </>
  );
}
