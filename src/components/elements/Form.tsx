type FormProps = {
  clientAction: (formData: FormData) => void;
  children: React.ReactNode;
};
const Form = ({ clientAction, children }: FormProps) => {
  
  return (
    <form action={clientAction} className="flex flex-col gap-4  ">
      {children}
    </form>
  );
};

export default Form;
