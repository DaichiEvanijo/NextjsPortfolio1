import Section from '@/components/elements/Section'
import CartItemList from '@/features/cart/CartItemList';
import React from 'react'

const Cart = () => {
  return (
    <Section className="flex flex-col gap-12 p-12">

       {/* Hero section start*/}
       <section className="flex flex-col justify-center items-center gap-24 py-24 text-center ">
        <p className="text-3xl bg-gradient-to-r from-lime-200  to-yellow-500  text-transparent bg-clip-text">
          Cart
        </p>
      </section>
      {/* Hero section end*/}

      <CartItemList/>

    </Section>

  )
}

export default Cart