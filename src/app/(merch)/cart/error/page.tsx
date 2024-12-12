import Button from "@/components/elements/Button";
import Section from "@/components/elements/Section";
import Link from "next/link";

const CancelPage = () => {
  return (
    <Section className="flex flex-col gap-2 justify-center items-center text-center">
      <h2 className="text-3xl font-bold">Payment Cancelled</h2>
      <p>Your cart is still available.</p>
      <Button><Link href="/cart">Back to Cart</Link></Button>
    </Section>
  );
};

export default CancelPage;
