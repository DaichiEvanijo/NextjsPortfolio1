import Image from "next/image";
import HomeImage from "../../public/HomeImage.jpg"
import TypeAnimation from "@/lib/thirdParty/react-type-animation"
import Section from "@/components/elements/Section";
import { SiNextdotjs } from "react-icons/si";
import {  FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import Accordion from "@/features/home/Accordion";
import Caption from "@/features/home/Caption";
import PortfolioList from "@/features/home/PortfolioList";



export default function Home() {  
  return (
    <Section className="">
      <section className="flex justify-center items-center min-h-[calc(100vh-72px)]">

        {/* hero image start */}
        <Image
          className="-z-10 absolute w-full h-[calc(100vh-72px)] object-cover"
          src={HomeImage}
          alt="Home Image"
          width={1445.76}
          height={1118.89}
          sizes="100vw"
          placeholder="blur"
        />
        {/* hero image end */}


        {/* text in hero image start*/}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-52 gap-24  animate-fromAbove p-6">
          <TypeAnimation
            className="text-2xl font-bold bg-gradient-to-r from-white via-white to-yellow-500  text-transparent bg-clip-text text-center h-[18vh]"
            sequence={[
              `I am\nDaichi\nKoyanagi`,
              2000,
              `I am\na self-taught\nfrontend\ndeveloper`,
              2000, 
              `I am\npassionate\nabout\nprogramming`, 
              2000, 
              `I love\nlearning\nnew stuff`, 
              2000, 
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            deletionSpeed={90}
            style={{ fontSize: "em", display: "inline-block", whiteSpace:"pre-line", }}
          />
          <div className="text-white text-center bg-black bg-opacity-40 rounded-2xl  p-4 space-y-2 shadow-xl">
            <p>created by</p>
            <div className="flex gap-4 justify-center items-center">
              <SiNextdotjs size={40}/>
              <SiTypescript size={40}/>
              <FaReact size={40}/>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <FaNodeJs size={40}/>
              <SiMongodb size={40}/>
              <RiTailwindCssFill size={40}/>
            </div>
          </div>
        </div>
        {/* text in hero image end*/}


      </section>
      

      <div className="flex flex-col justify-center items-center gap-48 py-48 px-4">

        <Caption/>
        
        {/* Portfolios start */}
        <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-2xl">Links to my portfolios</p>
          <PortfolioList/>
        </div>
        {/* Portfolios end */}

        <Accordion/>
        
      </div>

    
    </Section>
  );
}


