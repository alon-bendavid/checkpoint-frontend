import Link from "next/link";

export default function Header() {
  return (
    <header className="header bg-rose-600  text-white flex-col text-center">
      <h1 className="font-bold">Checkpoint : frontend</h1>
      <Link href="/countries">Countries</Link>
    </header>
  );
}
