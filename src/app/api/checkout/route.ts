import { CartType } from "@/types/CartType";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET as string);

const getActiveProducts = async () => {
  const products = await stripe.products.list();
  const availableProducts = products.data.filter(
    (product) => product.active === true
  );
  return availableProducts;
};
// 上のコードでstripeのdashboardのarchiveの商品などを取り除いた、active (available)の商品を取り出している

export const POST = async (request: NextRequest) => {
  // request.method, request.headers,request.body, request.url, request.query, request.cookiesなどが含まれる
  const cart: CartType[] = await request.json();
  let activeProducts = await getActiveProducts();

  try {
    for (const productInCart of cart) {
      const isAlreadyInStripe = activeProducts.find(
        (product) =>
          product.name.toLowerCase() === productInCart.name.toLowerCase()
      );
      // 上のコードはすでにstripeのproductsリストに商品がある時は新たに商品の欄を作らずに(二重になるので)数量を増やすようにするため
      if (!isAlreadyInStripe) {
        await stripe.products.create({
          name: productInCart.name,
          default_price_data: {
            unit_amount: productInCart.price * 100,
            // 100にするのはドルからセントにするためrecommended by Stripe Docs
            currency: "usd",
          },
        });
      }
    }
  } catch (err) {
    console.log(`error on creating new Producst: ${err}`);
    return NextResponse.json(
      { message: "failed to create product in stripe database" },
      { status: 500 }
    );
  }

  activeProducts = await getActiveProducts();

  const purchasingProducts: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const productInCart of cart) {
    const isAlreadyInStripe = activeProducts.find(
      (product) =>
        product.name.toLowerCase() === productInCart.name.toLowerCase()
    );
    if (isAlreadyInStripe) {
      //←これは冗長
      purchasingProducts.push({
        price: isAlreadyInStripe.default_price as string,
        quantity: productInCart.quantity,
      });
    }
  }
  // 下のコードでもいいはず、なぜならisAlreadyInStripeの確認はいらないから
  // for (const productInCart of cart) {
  //   purchasingProducts.push({
  //     price: productInCart.price,
  //     quantity: productInCart.quantity,
  //   });
  // }

  const session = await stripe.checkout.sessions.create({
    line_items: purchasingProducts,
    mode: "payment",
    success_url: "https://nextjs-portfolio1-weld.vercel.app/cart/success",
    // success_url: "http://localhost:3000/cart/success",
    cancel_url: "https://nextjs-portfolio1-weld.vercel.app/cart/cancel",
    // cancel_url: "http://localhost:3000/cart/cancel",
    shipping_address_collection: {
      allowed_countries: ["US", "DE", "JP"],
    },
    billing_address_collection: "required",
    // shipping_address_collectionはsessionで決済が完了したときにwebhook fileのconst event = stripe.webhook.constructEventのevent.data.object.shipping_detailsで取得できる
    // metadata: {
    //   orderId: 'order_98765',
    //   userId: 'user_12345',
    // },
    // metadataはsessionで決済が完了したときにwebhook fileのconst event = stripe.webhooks.constructEventのevent.data.object.metadataで取得できる
  });
  return NextResponse.json({ url: session.url });
  // ↑これでcheckoutのページへuserを導く
};

// const products = await stripe.products.list()
// {
//   "object": "list",
//   "url": "/v1/products",
//   "has_more": false,
//   "data": [
//     {
//       "id": "prod_NWjs8kKbJWmuuc",
//       "object": "product",
//       "active": true,
//       "created": 1678833149,
//       "default_price": null,
//       "description": null,
//       "images": [],
//       "marketing_features": [],
//       "livemode": false,
//       "metadata": {},
//       "name": "Gold Plan",
//       "package_dimensions": null,
//       "shippable": null,
//       "statement_descriptor": null,
//       "tax_code": null,
//       "unit_label": null,
//       "updated": 1678833149,
//       "url": null
//     }
//   ]
// }
