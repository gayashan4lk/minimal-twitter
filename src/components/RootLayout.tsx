import { type PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-fit justify-center">
      <div className="w-full border-x border-slate-700 md:max-w-2xl">
        {children}
      </div>
    </main>
  );
}
