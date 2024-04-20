"use client";

import Head from "next/head";
import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer/Footer";
import { inject, observer } from "mobx-react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";
import PageErrorFallback from "./FallbackError";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });

function BaseLayout({ authStore, children }) {
  const { getAuth, getMe } = authStore;
  const router = useRouter();
  return (
    <div className={`min-h-screen`}>
      <Head>
        <title>Wander Nurse</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Wander Nurse" key="title" />

        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      {getAuth && <Sidebar />}

      <div className={`flex flex-col ${getAuth && "mmd:ml-56"}`}>
        <Header />
        <div className={`${getAuth && "mmd:m-4"} bg-primary min-h-screen pb-4`}>
          <ErrorBoundary
            FallbackComponent={PageErrorFallback}
            resetKeys={[router]}
          >
            {children}
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default inject("authStore")(observer(BaseLayout));
