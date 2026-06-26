import Logo from "../logo/logo";
import { Button } from "../ui/button";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="border-[0.1px] rounded-4xl shadow-xl max-w-4xl p-2 border-white/20 backdrop-blur-md  absolute top-[4%]  list-none flex gap-4 items-center justify-between w-full">
      <li>
        <Logo />
      </li>
      <li>
        <nav className="flex gap-4 items-center justify-between">
          <li className="text-neutral-400">Pricing</li>
          <li className="text-neutral-400">About</li>
          <li>
            <Button variant="outline">Sign in</Button>
          </li>
          <li>
            <Button><Link href="/application">Open App</Link></Button>
          </li>
        </nav>
      </li>
    </nav>
  );
}
