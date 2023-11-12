import { useRouter } from "next/router";
import Head from "next/head";

export default function ProfileView() {
  const router = useRouter();

  console.log(router.query);
  const { profileId } = router.query;

  return (
    <>
      <Head>
        <title>{profileId}</title>
        <meta name="description" content="profile view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hi. I am {profileId}</div>
    </>
  );
}
