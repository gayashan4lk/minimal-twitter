import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import { CreatePostWizard } from "~/components/CreatePostWizard";
import { Feed } from "~/components/Feed";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-fit justify-center">
        <div className="w-full border-x border-slate-700 md:max-w-2xl">
          <div className="flex border-b border-slate-700 p-4">
            {isSignedIn ? (
              <>
                <CreatePostWizard user={user} />

                <SignOutButton>
                  <button className="ml-3 rounded-md bg-slate-900 px-3">
                    Logout
                  </button>
                </SignOutButton>
              </>
            ) : (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
}
