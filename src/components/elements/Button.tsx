import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { twMerge } from 'tailwind-merge'


export const btnStyles = cva(["transition duration-500 ease-in-out"], {
  variants:{
    variant:{
      // for buttons for Pagination
      default:["hover:opacity-60", "text-lime-400","disabled:text-slate-300"],
      disabled:["text-slate-300"],
      // for buttons in blog related pages
      yellowButton:["text-yellow-300", "border", "border-white","rounded-xl", "hover:border-yellow-300"],
      reactionButton:["hover:opacity-60", "text-lime-400", "border", "border-slate-200", "rounded"],
      deleteXButton:["hover:opacity-60", "text-lime-400", "text-xs"],
      // for buttons in Merch related pages
      cartButton:["hover:opacity-60", "text-lime-400","text-sm"],
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