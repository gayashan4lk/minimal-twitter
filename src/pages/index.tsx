import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { CreatePostWizard } from "~/components/CreatePostWizard";
import { Feed } from "~/components/Feed";
import LoadingSpinner from "~/components/LoadingSpinner";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
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
              <div className="flex w-full gap-3 ">
                <div className="flex w-full flex-row">
                  <h5 className="py-2 text-xl font-bold">
                    🎉 Welcome to Emoji Twitter
                  </h5>
                </div>

                <SignInButton>
                  <button className="ml-3 rounded-md bg-slate-900 px-3">
                    LogIn
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
}

// TODO: Build Post view
// TODO: Build Profile view
// TODO: Add frontend validation to create post wizard
