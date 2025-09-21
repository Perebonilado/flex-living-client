import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/Navbar";
import React, { FC, PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default AppLayout;
