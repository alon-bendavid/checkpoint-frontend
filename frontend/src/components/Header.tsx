import Link from "next/link";

export default function Header() {
  return (
    <header className="header bg-rose-600  text-white  text-center ">
      <Link href="/">
      <h1 className="font-bold">Checkpoint : frontend</h1>
      </Link>
      <Link href="/countries">Countries</Link>
    </header>
  );
}
