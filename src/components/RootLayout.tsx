import { type PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-fit justify-center">
      <div className="w-full md:max-w-2xl md:border-x md:border-slate-700">
        {children}
      </div>
    </main>
  );
}
