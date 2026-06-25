import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
      <p className="max-w-md text-muted-foreground">
        You do not have permission to view this page. Please sign in with the
        correct account role.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary transition"
        >
          Go Home
        </Link>
        <Link
          href="/login"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
