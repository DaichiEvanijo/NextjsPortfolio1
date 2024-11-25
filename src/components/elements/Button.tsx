import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { twMerge } from 'tailwind-merge'


export const btnStyles = cva(["transition duration-500 ease-in-out"], {
  variants:{
    variant:{
      default:["hover:opacity-60", "text-lime-500","disabled:text-slate-300","border","border-lime-500", "rounded"],
      disabled:["hover:opacity-60", "text-slate-200","border","border-lime-500", "rounded"],
      yellow:["text-yellow-300", "border", "border-white", "hover:border","hover:border-yellow-300", "rounded-xl" ],
      icon:["hover:opacity-60", "text-lime-500", "border", "border-slate-200", "rounded"],
      deleteButton:["hover:opacity-50", "text-lime-500", "text-xs"],
    }, 
    size:{
      default:["p-1"],
      yellowButton:["p-2"],
    },
  },
  defaultVariants:{
    variant:"default",
    size:"default"
  }
})


type ButtonProps = VariantProps<typeof btnStyles > & React.ComponentProps<"button">
const Button = ({variant, size, className, children, type, ...props}:ButtonProps) => {
  return (
    <button type={type} {...props} style={{ width: "fit-content"}} className={twMerge(btnStyles({variant, size}), className)}> 
    {children}
  </button>
  )
}

export default Button