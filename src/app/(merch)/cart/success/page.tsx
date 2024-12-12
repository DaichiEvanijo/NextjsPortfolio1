"use client";
import { useCart } from "@/context/CartProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Section from "@/components/elements/Section";
import { FaSpinner } from "react-icons/fa";

const SuccessPage = () => {
  const { setCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setCart([]);
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCart, router]);

  return (
    <Section className="flex flex-col gap-2 justify-center items-center text-center">
      <h1 className="text-3xl font-bold">Thank you for your purchase!</h1>
      <p>You will be redirected to the homepage shortly</p>
      <div className="animate-spin">
        <FaSpinner size={20} />
      </div>
    </Section>
  );
};

export default SuccessPage;
