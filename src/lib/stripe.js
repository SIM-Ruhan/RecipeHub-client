import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seller_starter' : "price_1TnZ1XKGUpah4RcASMc4Jsqk",
    'seller_pro' : "price_1TnYZ0KGUpah4RcAbnw1iRKj",
    'seller_master' : "price_1TnZ2KKGUpah4RcAuq0Kzi9D"

}