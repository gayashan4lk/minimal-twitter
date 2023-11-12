import { useRouter } from "next/router";
import Head from "next/head";
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

  const {
    data: user,
    isLoading,
    isError,
  } = api.profile.getUserByUserName.useQuery({
    userName: profileId,
  });

  console.log(user);

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error occurred!</div>;

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Minimal twitter profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        Hi. I am {user.firstName} {user.lastName}
      </div>
    </>
  );
}
