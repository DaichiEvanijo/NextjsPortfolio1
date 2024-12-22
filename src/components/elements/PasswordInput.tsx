import usePasswordHideShow from "@/hooks/usePasswordHideShow";

type PasswordInputProps = {
  id: string;
  name: string;
  labelText: string;
};
const PasswordInput = ({ id, name, labelText }: PasswordInputProps) => {
  const { showPassword, handleMouseDown, handleMouseLeave, handleMouseUp } = usePasswordHideShow();

  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <div className="w-full flex gap-2">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          required
          autoComplete="new-password"
          className="w-[80%] border border-slate-300 rounded-md transition ease-out duration-300  hover:border-[dodgerblue] outline-none"
        />
        <span
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {" "}
          {showPassword ? "・" : "👁️"}
        </span>
      </div>
    </>
  );
};

export default PasswordInput;
