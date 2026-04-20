import Link from "next/link";

/**
 * 404 page — shown for any route that doesn't exist.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-heading text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-text-primary">Nothing here.</h1>
      <p className="mt-3 max-w-xs text-text-muted">
        You took a wrong turn somewhere. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
