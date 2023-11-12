import { useRouter } from "next/router";
import Head from "next/head";

import { api } from "~/utils/api";

export default function ProfileView() {
  const router = useRouter();

  const { profileId } = router.query;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = api.profile.getUserByUserName.useQuery({
    userName: profileId!.slice(1).toString(),
  });

  console.log(user);

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error occured</div>;

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
