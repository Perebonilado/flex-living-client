import React, { FC } from "react";
import Container from "./Container";
import { AppLogo } from "./AppLogo";

const Navbar: FC = () => {
  return (
    <div className="h-[80px] border-b border-b-gray-300 flex items-center">
      <Container>
        <AppLogo />
      </Container>
    </div>
  );
};

export default Navbar;
