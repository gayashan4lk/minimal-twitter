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
      <div>
        <Link href="/">Home</Link>
        <ProfileImage imageUrl={imageUrl} size={128} />
        <p>
          First name: {firstName}, Last name: {lastName}, Id: {id}, imageURL:{" "}
          {imageUrl}, userName: {userName}
        </p>
      </div>
    </>
  );
}
