import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import RootLayout from "~/components/RootLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Minimal Twitter</title>
        <meta name="description" content="Created by gayashan wagachchi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
