import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        404
      </p>
      <h1 className="text-3xl font-bold text-foreground">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
        >
          Go Home
        </Link>
        <Link
          href="/tickets"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary transition"
        >
          Browse Tickets
        </Link>
      </div>
    </main>
  );
}
