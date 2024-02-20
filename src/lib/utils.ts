import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price:number|string,
  options:{
    currency?: "USD" | "HKD" | "BDT" | "EUR",
    notation?: Intl.NumberFormatOptions["notation"]
  }={}
){
  const {currency="HKD", notation ='compact'}=options
  const numericPrice= typeof price ==="string" ? parseFloat(price):price
  // turning string to a number

  return new Intl.NumberFormat('HKD',{
    style:"currency",
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice)
}