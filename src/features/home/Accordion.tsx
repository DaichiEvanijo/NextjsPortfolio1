"use client"

import AccordionData from "@/data/AccordionData"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { useRef, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"


const Accordion = () => {
  const ref = useRef<HTMLOListElement>(null)
  const isLoaded = useIntersectionObserver({options:[{threshold:0}], refs:[ref]})
  


  const [selected, setSelected] = useState<null | number>(null)
  const toggle = (index:number) => {
    if(selected === index) return setSelected(null) 
    setSelected(index)
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col text-xl text-center">
          Here is the list of languages and topics that I have learned and used until now
      </div>
      <ol ref={ref} className={`p-4 bg-gradient-to-r from-blue-100 via-yellow-100 to-blue-100 rounded-2xl shadow-xl ${isLoaded[0]? "animate-fromRight":"opacity-0"}`}>
        {AccordionData.map((data, index) => {
          return (
            <li key={index} className="border border-slate-200 rounded-xl p-2">
              <div className="flex justify-between items-center cursor-pointer transition duration-500 ease-in-out hover:opacity-30 text-xl" onClick={()=> toggle(index)}>
                <h2>{data.language}</h2>
                <span>{selected === index ? <FaMinus />:<FaPlus />}</span>
              </div>
              <p
              className={`w-[90%] p-2 break-normal transition-all duration-500 ease-in-out ${selected === index ? "opacity-100 max-h-screen ":"opacity-0 max-h-0 overflow-hidden"}
                `}>{data.keywords}</p>
            </li>
         )
        })}
      </ol>
    </section>
  )
}

export default Accordion