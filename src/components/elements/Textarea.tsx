const Textarea = ({
  ...props
}: React.ComponentProps<"textarea"> & { labelText: string }) => {

  const { id, labelText, ...other } = props;
  
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{labelText}</label>
      <textarea id={id} {...other} className="w-[80%] h-[25vh] border border-slate-300 rounded-md transition ease-out duration-300  hover:border-[dodgerblue] outline-none" />
    </div>
  );
};

export default Textarea;
