"use client";
import Navbar from "@/components/Navbar/Navbar";
import { LampContainer } from "@/components/ui/lamp";
import { UserContext, useUserContext } from "@/context/user.context";
import Image from "next/image";
import { useContext } from "react";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import BlogPost from "@/components/BlogPost";


export default function Home() {
  let {userInfo} = useUserContext();
  
  let words = ["creative", "modern", "specific", "expressive"];
  return (
   userInfo.isAuthenticated ===false ? <main className="w-full h-full flex items-center justify-center gap-y-7">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-16 bg-gradient-to-br from-slate-300 to-slate-500  bg-clip-text text-center text-4xl w-screen    gap-y-4  font-medium tracking-tight text-transparent md:text-7xl"
        >
          <h2 className="text-4xl md:text-8xl mt-14">
            Lets be <FlipWords words={words}></FlipWords>, join us Now
          </h2>
          <p className="text-2xl mt-5 ">
            Join us for a unique experience where you can share your ideas and
            connect with like-minded individuals.
          </p>
        </motion.h1>

        <div className="flex w-[50%] justify-around items-center mt-10">
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            
          >
            <Link href={'signup'}>
            Sign up
            </Link>
          </Button>
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
           
          >
            <Link href="/login">
              Login
            </Link>
           
          </Button>
        </div>
      </LampContainer>
    </main> : 
    <main>
      <BlogPost/>
    </main>
  );
}
