type SectionForFormProps ={
  h2Text:string,
  children:React.ReactNode,
}

const SectionForForm = ({h2Text, children}:SectionForFormProps) => {
  return (
    <section className="min-h-[calc(100vh-144px)] overflow-y-auto flex flex-col items-center justify-center py-4 ">
        <div className="w-4/5 sm:w-3/4 max-w-2xl bg-lime-100 shadow-xl rounded-xl p-3 ">
          <h2 className="text-3xl my-3">{h2Text}</h2>
          {children}
        </div>
    </section>
  );
};

export default SectionForForm;
