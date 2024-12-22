import { twMerge } from "tailwind-merge";

type SectionProps = {
  children: React.ReactNode;
  className: string;
};
const Section = ({ children, className }: SectionProps) => {

  return (
    <section
      className={twMerge(
        "min-h-[calc(100vh-144px)] mx-auto max-w-4xl",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
