import { type PropsWithChildren, type ReactNode, useState, createContext, useContext, Children } from 'react'
import { IconX } from '@tabler/icons-react'
import Button from './button'

const DialogContext = createContext<{
  open: () => void;
  close: () => void;
} | null>(null)

function DialogHeader(props: PropsWithChildren) {
  return (
    <div className='mb-3 flex flex-row text-black text-md leading-none font-semibold'>
      { props.children }
    </div>
  )
}

function DialogFooter(props: PropsWithChildren) {
  return (
    <div className='mt-auto mb-0 ml-auto mr-0 flex flex-row gap-2'>
      { props.children }
    </div>
  )
}

function DialogTrigger(props: PropsWithChildren) {
  const context = useContext(DialogContext)

  return (
    <div onClick={context?.open}>
      { props.children }
    </div>
  )
}

function DialogClose(props: PropsWithChildren) {
  const context = useContext(DialogContext)

  return (
    <div onClick={context?.close}>
      { props.children }
    </div>
  )
}

function DialogDescription(props: PropsWithChildren) {
  return (
    <div className='mb-2 text-[#1e1313] text-sm'>
      { props.children }
    </div>
  )
}

type DialogPropsType = PropsWithChildren<{
  trigger: ReactNode,
  onOpen?: () => void,
  onClose?: () => void,
}>

function Dialog(props: DialogPropsType) {
  if (!props.children) {
    return
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => {
    if (props.onOpen) props.onOpen()
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    if (props.onClose) props.onClose()
    setIsDialogOpen(false)
  }

  let component
  
  if (!isDialogOpen) {
    component = props.trigger
  }
  else {
    component = 
      <div
        className='top-0 left-0 bg-black/40 fixed w-full h-full cursor-pointer z-1000 duration-200'
        onClick={closeDialog}
      >
        <div
          className='absolute w-[425px] h-[495px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg bg-white cursor-default'
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant='default'
            className='bg-transparent p-0 has-[>svg]:px-0 absolute top-4 right-4 cursor-pointer w-6 h-6 flex justify-center items-center'
            onClick={closeDialog}
          >
            <IconX className='w-4 h-4'/>
          </Button>
            <div className='relative flex flex-col w-full h-full'>
              { props.children }
            </div>
        </div>
      </div>
  }
  
  return (
    <DialogContext.Provider value={{ open: openDialog, close: closeDialog }}>
      { component }
    </DialogContext.Provider>
  )
}

export {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose,
}