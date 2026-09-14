import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="wordmark" aria-label="Two Roots Realty home">
      <span>TWO ROOTS</span>
      <small>REALTY</small>
    </Link>
  );
}
