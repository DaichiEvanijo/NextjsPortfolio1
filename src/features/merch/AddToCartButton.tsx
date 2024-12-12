"use client";
import Button from "@/components/elements/Button";
import { useCart } from "@/context/CartProvider";
import { ProductType } from "@/lib/types/ProductType";
import React from "react";


type AddToCartButtonProps ={
  product:ProductType
}
const AddToCartButton = ({ product }:AddToCartButtonProps) => {

  const { increment, cart } = useCart();

  const quantityInCart = cart.find((item) => item._id === product._id)?.quantity || 0;


  return (
    <Button
      type="button"
      variant="cartButton"
      onClick={() => increment(product)}
    >
      Add to Cart {quantityInCart> 0 && <span>({quantityInCart})</span>}
    </Button>
  );
};

export default AddToCartButton;
