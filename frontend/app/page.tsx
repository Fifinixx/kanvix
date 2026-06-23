import Hero from "@/components/hero/hero";
import NavBar from "@/components/navbar/navbar";
import DarkVeil from "../components/DarkVeil";

export default function Home() {
  return (
    <main className="realtive flex  w-full h-full flex-col items-center justify-around ">
      <div className="absolute bg-black  w-screen h-screen -z-1">
        <DarkVeil />
      </div>
      <NavBar />
      <Hero />
    </main>
  );
}
