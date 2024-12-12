import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET as string);

import {Resend} from "resend"
import ConformationEmail from "@/features/cart/ConformationEmail";
import React from "react"



export const POST = async (request: NextRequest) => {

  const payload = await request.text(); 
  const sig = request.headers.get("stripe-signature") as string;
  // sigはreqを送ってきたのはstripeであるということを確認するためのvalue

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log(session.customer_details?.email)
        console.log("Checkout session completed:", session);
        // 決済後の処理（例: データベース更新、メール送信など）
        // ①Thank you for purchase email with Resend 
        const resend = new Resend(process.env.RESEND_API_KEY)
        resend.emails.send({
          from:"Daichi Koyanagi <onboarding@resend.dev>",
          to: session.customer_details?.email as string,
          replyTo:"takanogi2468@gmail.com",
          subject:"Thank you for the purchase",
          // html:` <h1>Thank you for your purchase!</h1>
          //       <p>Your order is confirmed and will be processed shortly.</p>
          //       <p>If you have any questions, please contact our support team.</p>`,
          // or
          react:React.createElement(ConformationEmail),
        })
 
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Webhook 通知を受け取ったことを Stripe に通知
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`Webhook error: ${err}`);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
};


// web hookをlocalで試す方法
// CMPでC:\Users\sdkam\Downloads\stripe_1.22.0_windows_x86_64に行き、そこで"stripe login"をコード、loginした後は"stripe listen --forward-to localhost:3000/api/checkout/webhook"をコード。その後は実際にlocalhost:3000を開いて、checkoutボタンを押すと、そのlogがCMP上とstripe database上にも表示される


// const event = stripe.webhooks.constructEvent(
//   payload,
//   sig,
//   process.env.STRIPE_WEBHOOK_SECRET 
// );
//               ↓
// {
//   "id": "evt_1NG8Du2eZvKYlo2CUI79vXWy",
//   "object": "event",
//   "api_version": "2019-02-19",
//   "created": 1686089970,
//   "data": {
//     "object": {
//       "id": "seti_1NG8Du2eZvKYlo2C9XMqbR0x",
//       "object": "setup_intent",
//       "application": null,
//       "automatic_payment_methods": null,
//       "cancellation_reason": null,
//       "client_secret": "seti_1NG8Du2eZvKYlo2C9XMqbR0x_secret_O2CdhLwGFh2Aej7bCY7qp8jlIuyR8DJ",
//       "created": 1686089970,
//       "customer": null,
//       "description": null,
//       "flow_directions": null,
//       "last_setup_error": null,
//       "latest_attempt": null,
//       "livemode": false,
//       "mandate": null,
//       "metadata": {},
//       "next_action": null,
//       "on_behalf_of": null,
//       "payment_method": "pm_1NG8Du2eZvKYlo2CYzzldNr7",
//       "payment_method_options": {
//         "acss_debit": {
//           "currency": "cad",
//           "mandate_options": {
//             "interval_description": "First day of every month",
//             "payment_schedule": "interval",
//             "transaction_type": "personal"
//           },
//           "verification_method": "automatic"
//         }
//       },
//       "payment_method_types": [
//         "acss_debit"
//       ],
//       "single_use_mandate": null,
//       "status": "requires_confirmation",
//       "usage": "off_session"
//     }
//   },
//   "livemode": false,
//   "pending_webhooks": 0,
//   "request": {
//     "id": null,
//     "idempotency_key": null
//   },
//   "type": "setup_intent.created"
// }



