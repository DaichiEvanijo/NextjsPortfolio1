"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CartType } from "@/lib/types/CartType";
import { ProductType } from "@/lib/types/ProductType";
import React, { createContext, useContext } from "react";



type CartContextType = {
  cart: CartType[],
  setCart:React.Dispatch<CartType[]>
  increment: (product: ProductType) => void,
  decrement:(productId:string) => void,
  removeFromCart:(productId:string) => void,
  totalItems:number,
  totalPrice:number 
};
const CartContext = createContext<CartContextType>({} as CartContextType);



type CartContextProviderProps = {
  children: React.ReactNode;
};
export const CartContextProvider = ({ children }: CartContextProviderProps) => {

  const [cart, setCart] = useLocalStorage<CartType[]>("cart", []);



  const increment = (product: ProductType) => {
    setCart((prev: CartType[]) => {
      const itemExists = prev.some((item) => item._id === product._id);

      if (itemExists) {
        return prev.map((item) => {
          return item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };



  const decrement = (productId: string) => {
    setCart((prev: CartType[]) => {
      return prev.map((item) => {
        return item._id === productId
          ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 } // Math.max(item.quantity - 1, 1);
          : item;
      });
    });
  };



  const removeFromCart = (productId: string) => {
    const filteredCart = cart.filter((item) => item._id !== productId);
    setCart([...filteredCart]);
  };




  const totalItems = cart.reduce((previousvalue, item) => {
    return previousvalue + item.quantity;
  }, 0);



  const totalPrice = cart.reduce((previousValue, item) => {
    return previousValue + item.price * item.quantity;
  }, 0);



  return (
    <CartContext.Provider value={{ cart, setCart, increment, decrement, removeFromCart, totalItems, totalPrice}}>
      {children}
    </CartContext.Provider>
  );
};





export const useCart = ():CartContextType => useContext(CartContext)


