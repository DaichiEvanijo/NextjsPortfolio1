import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  
  return (
    <div className="h-dvh flex justify-center items-center animate-spin">
      <FaSpinner  size={20}/>
    </div>
  )
}