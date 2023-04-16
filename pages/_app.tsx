import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ErrorBoundary>
  );
}
