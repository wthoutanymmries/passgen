import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generate(length: number, characterSet?: string) {
  let result = ''

  if (!characterSet) {
    characterSet = '$?!@#%^&*()-_+={}[]|\,.;\"\'<>/\\~01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length)
    result += characterSet[randomIndex]
  }

  return result
}
