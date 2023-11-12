import { useRouter } from "next/router";
import Head from "next/head";

export default function SinglePostView() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      <Head>
        <title>My post</title>
        <meta name="description" content="post view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Hi. This is post {id}</div>
    </>
  );
}
