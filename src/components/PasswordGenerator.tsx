import { useState, useEffect } from 'react'
import { IconSparkles, IconBulb } from '@tabler/icons-react'

import Button from './ui/button'
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  // DialogDescription,
  DialogTrigger,
  DialogClose,
} from './ui/Dialog'

function PasswordGenerator() {
  const specialCharacters = '$?!@#%^&*()-_+={}[]|\,.;\"\'<>/\\~'
  const digits = '01234567890'
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCharacters = 'abcdefghijklmnopqrstuvwxyz'

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [withSpecialCharacters, setWithSpecialCharacters] = useState(true)
  const [withDigits, setWithDigiits] = useState(true)
  const [withUppercaseCharacters, setWithUppercaseCharacters] = useState(true)
  const [withLowercaseCharacters, setWithLowercaseCharacters] = useState(true)
  const [withCustomCharacterSet, setWithCustomCharacterSet] = useState(false)
  const [customCharacterSet, setCustomCharacterSet] = useState('')

  const generatePassword = async () => {
    let characterSet = ''

    if (withCustomCharacterSet) {
      characterSet = customCharacterSet
    }
    else {
      if (withSpecialCharacters) characterSet += specialCharacters
      if (withDigits) characterSet += digits
      if (withUppercaseCharacters) characterSet += uppercaseCharacters
      if (withLowercaseCharacters) characterSet += lowerCharacters
    }

    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length)
      result += characterSet[randomIndex]
    }

    setPassword(result)

    try {
      await navigator.clipboard.writeText(result)
    }
    catch (error) {
      console.log(error)
    }
  }

  const triggerComponent =
    <DialogTrigger>
      <Button variant="default">
        <IconSparkles /> Generate
      </Button>
    </DialogTrigger>

  return (
    <Dialog trigger={triggerComponent} onOpen={generatePassword}>
      <DialogHeader>Generate password</DialogHeader>
      {/* <DialogDescription>Customise your password below. Click Generate when you're ready</DialogDescription> */}
      
      <div className="w-full min-h-4 rounded-lg border border-[#e9e4e5] px-4 py-3 text-sm flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <IconBulb />
          <span className="text-black text-md leading-none font-semibold">
            Pro tip!
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="min-w-6 h-6"></div>
          <span className="text-[#a1a1a1] text-sm">
            Click Generate multiple times to find your perfect password.
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-2 mt-2 items-center">
        <label
          htmlFor="password-length"
          className="font-semibold text-sm"
        >
          Password length:
        </label>
        <input
          type="number"
          id="password-length"
          min="1"
          max="15"
          value={passwordLength}
          className='outline-none'
          onChange={(e) => setPasswordLength(+e.target.value)}
        />
      </div>

      {
        withCustomCharacterSet
          ? null
          : <>
              <div className="flex flex-row gap-2 mt-2">
                <input
                  type="checkbox"
                  id="special-characters"
                  className="accent-black"
                  checked={withSpecialCharacters}
                  onChange={(e) => setWithSpecialCharacters(!withSpecialCharacters)}
                />
                <label htmlFor="special-characters" className="font-semibold text-sm">
                  Use special characters
                </label>
              </div>
              <span className="text-[#a1a1a1] text-sm ml-[calc(1.25rem+2px)]">
                { specialCharacters }
              </span>
              <div className="flex flex-row gap-2 mt-2">
                <input
                  type="checkbox"
                  id="digits"
                  className="accent-black"
                  checked={withDigits}
                  onChange={(e) => setWithDigiits(!withDigits)}
                />
                <label htmlFor="digits" className="font-semibold text-sm">
                  Use digits
                </label>
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <input
                  type="checkbox"
                  id="uppercase"
                  className="accent-black"
                  checked={withUppercaseCharacters}
                  onChange={(e) => setWithUppercaseCharacters(!withUppercaseCharacters)}
                />
                <label htmlFor="uppercase" className="font-semibold text-sm">
                  Use uppercase characters
                </label>
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <input
                  type="checkbox"
                  id="lowercase"
                  className="accent-black"
                  checked={withLowercaseCharacters}
                  onChange={(e) => setWithLowercaseCharacters(!withLowercaseCharacters)}
                />
                <label htmlFor="lowercase" className="font-semibold text-sm">
                  Use lowercase characters
                </label>
              </div>
            </>
      }

      <div className="flex flex-row gap-2 mt-2">
        <input
          type="checkbox"
          id="custom"
          className="accent-black"
          checked={withCustomCharacterSet}
          onChange={(e) => setWithCustomCharacterSet(!withCustomCharacterSet)}
        />
        <label htmlFor="custom" className="font-semibold text-sm">
          Use custom character set
        </label>
      </div>

      {
        withCustomCharacterSet
          ? <input
              type="text"
              placeholder="Enter characters.."
              value={customCharacterSet}
              className='outline-none mt-2 border border-[#e9e4e5] px-2 rounded-md h-8'
              onChange={(e) => setCustomCharacterSet(e.target.value)}
            />
          : null
      }
      
      <p className="justify-center my-auto mx-auto text-4xl selection:bg-black/20">
        { password }
      </p>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline">
            <IconSparkles /> Cancel
          </Button>
        </DialogClose>
        <Button variant="primary" onClick={generatePassword}>
          <IconSparkles /> Generate & Copy
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default PasswordGenerator