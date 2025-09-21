import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/Navbar";
import Head from "next/head";
import React, { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
    <Head>
      <title>The Flex</title>
    </Head>
      <Navbar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default AppLayout;
