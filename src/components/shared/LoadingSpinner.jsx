"use client";

import { Spinner } from "@heroui/react";

export default function LoadingSpinner({ size, className = "py-10" }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Spinner size={size} />
    </div>
  );
}
