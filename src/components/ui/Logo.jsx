"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from 'react';

const Logo = () => {
    const { resolvedTheme } = useTheme();
    return (
    <Image
      src={
        resolvedTheme === "dark"
          ? "/logo-dark.svg"
          : "/logo-light.svg"
      }
      alt="RouteGo"
      width={50}
      height={60}
    />
  );
}

export default Logo;