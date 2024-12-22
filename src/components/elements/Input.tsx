import { twMerge } from "tailwind-merge";

const Input = ({
  ...props
}: React.ComponentProps<"input"> & {
  labelText?: string;
}) => {
  const { id, labelText, className, ...other } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="cursor-pointer">
        {labelText}
      </label>
      <input
        id={id}
        {...other}
        className={twMerge(
          "w-4/5 border border-slate-300 rounded-md transition  ease-out duration-300  hover:border-[rgb(30,144,255)] outline-none file:p-1 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:text-lime-500 file:disabled:text-slate-300 file:bg-white placeholder:text-xs placeholder:sm:text-sm ",
          className
        )}
      />
    </div>
  );
};

export default Input;
