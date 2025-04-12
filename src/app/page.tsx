import Link from "next/link";
import { TunnelVision } from "../components/animations/TunnelVision";

export default function Home() {
  return (
    <main className="grid grid-cols-2 mx-auto relative w-[1000px] h-screen items-center">
      <div className="w-[500px] h-[500px]">
        <TunnelVision />
      </div>
      <div className="ml-20">
        <h1>Matt Masurka</h1>
        <nav>
          <Link href="/about">About</Link>
          <Link href="/connnect">Connect</Link>
        </nav>
      </div>
    </main>
  );
}
