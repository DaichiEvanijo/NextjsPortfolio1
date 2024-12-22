"use client"
import Button from "@/components/elements/Button";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Link from "next/link";
import { useRef } from "react";

const PortfolioList = () => {
  const ref1 = useRef<HTMLLIElement>(null)
  const ref2 = useRef<HTMLLIElement>(null)
  const ref3 = useRef<HTMLLIElement>(null)
  const isLoaded = useIntersectionObserver({options:[{threshold:0},{threshold:0},{threshold:0}], refs:[ref1, ref2, ref3]})
  
  
  return (
    <ol  className={"list-decimal list-inside space-y-4"}>
      <li ref={ref1} className={`${isLoaded[0] ? "animate-fromLeft":"opacity-0"}`}>
        <p>
          Next.js (App Router) Next-Auth full-stack Blogs/E-commerce website
          using Typescript/React/Tailwind CSS integrated with Stripe checkout and Resend/React-email<br/>**Check README.md for login information
        </p>
        <div className="space-x-2">
          <Button>
            <Link href="/">Demo</Link>
          </Button>
          <Button>
            <Link href="https://github.com/DaichiEvanijo/NextjsPortfolio1" target="_blank">
              Source code
            </Link>
          </Button>
        </div>
      </li>
      <li ref={ref2} className={`${isLoaded[1] ? "animate-fromLeft":"opacity-0"}`}>
        <p>
          MERN full-stack post site with JWT Authorization/Authentication with
          Typesript managed by Redux toolkit<br/>**Check README.md for login
          information
        </p>
        <div className="space-x-2">
          <Button>
            <Link
              href="https://mernfrontend-o4y0.onrender.com/"
              target="_blank"
            >
              Demo
            </Link>
          </Button>
          <Button>
            <Link
              href="https://github.com/DaichiEvanijo/mernFrontend"
              target="_blank"
            >
              Source Frontend
            </Link>
          </Button>
          <Button>
            <Link
              href="https://github.com/DaichiEvanijo/mern-api"
              target="_blank"
            >
              Source Backend
            </Link>
          </Button>
        </div>
      </li>
      <li ref={ref3} className={`${isLoaded[2] ? "animate-fromLeft":"opacity-0"}`}>
        <p>
          Mini e-commerce website by using React/Typescript/Tailwind CSS wtih
          useContext state management
        </p>
        <div className="space-x-2">
          <Button>
            <Link
              href="https://daichievanijo.github.io/typescript-portfolio1/"
              target="_blank"
            >
              Demo
            </Link>
          </Button>
          <Button>
            <Link
              href="https://github.com/DaichiEvanijo/typescript-portfolio3"
              target="_blank"
            >
              Source code
            </Link>{" "}
          </Button>
        </div>
      </li>
    </ol>
  );
};

export default PortfolioList;
