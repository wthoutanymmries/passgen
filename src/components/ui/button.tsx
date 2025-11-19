import { type PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = "default" | "primary" | "secondary" | "outline"
type PropsType = PropsWithChildren<{
  variant: ButtonVariant
  className?: string,
  onClick?: () => void,
}>

function Button(props: PropsType) {
  const defaultClassList = 'rounded-md text-sm font-medium whitespace-nowrap inline-flex items-center outline-none shrink-0 h-9 px-4 has-[>svg]:px-3 py-2 gap-2 hover:cursor-pointer'
  const variants = {
    default: 'bg-white hover:bg-white/90 text-black',
    secondary: 'bg-white/10 hover:bg-white/70 text-white hover:text-black',
    primary: 'bg-black text-white',
    outline: 'border border-black bg-white hover:bg-black/10 text-black',
  }
  const classList = variants[props.variant]

  return (
    <button className={cn(defaultClassList, classList, props.className)} onClick={props.onClick}>
      { props.children }
    </button>
  )
}

export default Button