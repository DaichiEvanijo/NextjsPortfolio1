"use client"
import { useCart } from "@/context/CartProvider";
import Image from "next/image";
import Button from "@/components/elements/Button";
import formatCurrency from "@/components/elements/formatCurrency";
import { useRouter } from "next/navigation";



const CartItemList = () => {
  const {cart, increment, decrement, removeFromCart, totalItems, totalPrice} = useCart()

  const router = useRouter()
  const handleCheckout = async () => {
    try{
      const response = await fetch("https://nextjs-portfolio1-weld.vercel.app/api/checkout", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(cart)
      })
      const data = await response.json()

      if(data.url) router.push(data.url)

      console.log(`${data.message} ${data.status}`)
    // ↑Routeからのreturn NextResponse.json({message:"failed to create product in stripe database"},{status:500})を受け取っている
    }catch(err){
      console.log(`err:${err}`)
      // ↑このcatchブロックではroute.tsから返事がない時にエラーを受け取る、サーバーがダウンしている。クライアントがオフライン状態。サーバーのURLが間違っている。クロスオリジンポリシー（CORS）違反。
    }
  }


  
  return (
    <>
      {cart && cart.length ? (
        <>
          <ul className="w-full flex flex-wrap justify-center items-center gap-5">
            {cart.map((product) => {
              return (
                <li
                  key={product._id}
                  className="flex flex-col justify-center items-center gap-4 border-2 border-slate-300 rounded-2xl p-5 shadow-xl transiton duration-300 transform hover:scale-105"
                >
                  <p className="text-2xl">{product.name}</p>
                  <Image
                    src={`/products/${product.name}.jpg`}
                    alt={product.name}
                    className="w-[450px] min-[929px]:w-[350px] h-auto"
                    width={450}
                    height={458}
                    sizes="(max-width:929px) 450px, 350px"
                  />
                  <span>{formatCurrency(product.price)}</span>
                  <div className="flex gap-2">
                    <Button type="button" variant="cartButton" onClick={() => decrement(product._id)}>-</Button>
                    <span>{product.quantity}</span>
                    <Button type="button" variant="cartButton" onClick={() => increment(product)}>+</Button>
                  </div>
                  <Button type="button" variant="cartButton" onClick={() => removeFromCart(product._id)}>Remove</Button>
                </li>
              );
            })}
          </ul>
          <div className="text-center">
            <div>Total: {totalItems}</div>
            <div>Subtotal: ${totalPrice}</div>
          </div>
          <Button className="mx-auto" onClick={handleCheckout}>Checkout</Button>
        </>
      ) : (
        <p className="text-2xl text-center">
          There is no product in cart
        </p>
      )}
    </>

  )
}

export default CartItemList