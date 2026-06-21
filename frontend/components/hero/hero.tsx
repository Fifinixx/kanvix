import SignInForm from "../authForms/signin";
import SignUpForm from "../authForms/signup";
import { Button } from "../ui/button";


export default function Hero() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-2xl h-4xl max-h-4xl">
        <div className=" w-full p-4 flex h-full flex-col gap-2 justify-center items-center">
          <h3 className="text-6xl text-neutral-50 font-bold text-center">
            A Multi-Tenant task project tracker
          </h3>
          <p className="text-neutral-50  text-center">
            Track work together, in real time. Organize projects across your
            teams on a shared board where every change appears instantly for
            everyone.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Button>Try for free</Button>
            <Button variant="secondary">See live demo</Button>
          </div>
        </div>
      </div>
    </>
  );
}
