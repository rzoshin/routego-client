"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";

export default function TicketsPagination({ totalPages, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/tickets?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <Button
        variant="bordered"
        isDisabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "solid" : "bordered"}
          onClick={() => goToPage(page)}
          className="min-w-10"
        >
          {page}
        </Button>
      ))}
      <Button
        variant="bordered"
        isDisabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
