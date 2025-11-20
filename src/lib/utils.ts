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

export async function simulateServerResponse<T>(
  payload: () => T,
  delay: number = 200
): Promise<{ status: number, data?: T, error?: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.65) {
        resolve({ status: 200, data: payload() })
      }
      else {
        resolve({ status: 500, error: 'Internal server error.' })
      }
    }, delay)
  })
}
