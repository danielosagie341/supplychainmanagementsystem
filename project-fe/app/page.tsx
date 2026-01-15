import Image from "next/image";
import {use } from 'react'
import {HeroSection} from "@/components/HeroSection";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 ">
      <HeroSection/>
    </div>
  );
}
