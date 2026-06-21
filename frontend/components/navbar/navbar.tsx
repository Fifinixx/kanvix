import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
export default function NavBar() {
  return (
    <nav className="border-[0.1px] border-4xl  rounded-2xl shadow-xl max-w-4xl p-4 border-white/20 backdrop-blur-md  absolute top-[4%]  list-none flex gap-4 items-center justify-between w-full">
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
            <Button>Sign up</Button>
          </li>
        </nav>
      </li>
    </nav>
  );
}
