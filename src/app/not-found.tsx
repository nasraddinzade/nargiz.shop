import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold">404</p>
      <p className="mt-3 text-lg">Bu səhifə tapılmadı.</p>
      <Link href="/" className="btn btn-primary mt-6">Ana səhifəyə</Link>
    </div>
  );
}
