import { useRef, useState } from 'react'
import { IconSparkles } from '@tabler/icons-react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  type DialogHandle,
} from './ui/Dialog'
import Button from './ui/Button'
import { generate, simulateServerResponse } from '@/lib/utils'

const credentialSchema = z.object({
  service: z
    .string()
    .nonempty('Field should not be empty')
    .max(30, 'Field should not contain more than 30 characters'),
  login: z
    .string()
    .nonempty('Field should not be empty')
    .max(30, 'Field should not contain more than 30 characters'),
  password: z
    .string()
    .nonempty('Field should not be empty')
    .max(30, 'Field should not contain more than 30 characters'),
})

type CredentialFormValues = z.infer<typeof credentialSchema>
type PropsType = {
  onAddCredential: () => void,
}

function AddCredential(props: PropsType) {
  const dialogRef = useRef<DialogHandle>(null)
  const messageDialogRef = useRef<DialogHandle>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const triggerComponent =
    <DialogTrigger>
      <Button variant="primary">
        Add
      </Button>
    </DialogTrigger>
  
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialFormValues>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      service: '',
      login: '',
      password: '',
    }
  })

  const onOpen = () => {
    setValue('service', '')
    setValue('login', '')
    setValue('password', '')
    clearErrors()
  }

  const onClose = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        console.log(key, localStorage.getItem(key))
      }
    }
  }

  const addCredential = (key: string, credential: string) => {
    localStorage.setItem(key, credential)
  }
  
  const onSubmit = async (data: CredentialFormValues) => {
    const credentials = localStorage.getItem(data.service)

    if (credentials) {
      setErrorMessage('Credentials for this service already exist.')
      messageDialogRef.current?.open()
      return
    }

    // localStorage.setItem(
    //   `${data.service}`,
    //   JSON.stringify({
    //     login: data.login,
    //     password: data.password,
    //   })
    // )
    const response = await simulateServerResponse(
      () => addCredential(
        `${data.service}`,
        JSON.stringify({
            login: data.login,
            password: data.password,
        })
      )
    )

    if (response.status !== 200) {
      setErrorMessage('Please try again.')
      messageDialogRef.current?.open()
      return
    }

    props.onAddCredential()

    const serviceListStorageItem = localStorage.getItem('__serviceList')
    const serviceList = serviceListStorageItem
      ? JSON.parse(serviceListStorageItem) || []
      : []
    
    serviceList.push(data.service)
    localStorage.setItem('__serviceList', JSON.stringify(serviceList))
    
    if (dialogRef.current) dialogRef.current.close()
  }

  const generatePassword = () => {
    setValue('password', generate(15), { shouldValidate: true })
  }

  return (
    <>
      <Dialog
        ref={dialogRef}
        trigger={triggerComponent}
        onOpen={onOpen}
        className='w-[425px] h-[495px]'
      >
        <DialogHeader>Add service</DialogHeader>
        <DialogDescription>
          Add your login details here.
        </DialogDescription>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)()
          }}
          className='flex flex-col h-full'
        >
          <label htmlFor='service-field' className="font-semibold text-sm">Service:</label>
          <input
            type="text"
            id="service-field"
            placeholder="Enter service name"
            className='outline-none mt-2 border border-[#e9e4e5] px-2 rounded-md h-9 text-sm'
            {...register('service')}
          />
          {
            errors.service && (
              <p className='text-sm text-red-500'>{errors.service.message}</p>
            )
          }
          
          <label htmlFor='login-field' className="font-semibold text-sm mt-2">Login:</label>
          <input
            type="text"
            id="login-field"
            placeholder="Enter username"
            className='outline-none mt-2 border border-[#e9e4e5] px-2 rounded-md h-9 text-sm'
            {...register('login')}
          />
          {
            errors.login && (
              <p className='text-sm text-red-500'>{errors.login.message}</p>
            )
          }
          
          <label htmlFor='password-field' className="mt-2 font-semibold text-sm">Password:</label>
          <div className='flex flex-row gap-2 mt-2'>
            <input
              type="text"
              id="password-field"
              placeholder="Enter password"
              className='grow outline-none border border-[#e9e4e5] px-2 rounded-md h-9 text-sm'
              {...register('password')}
            />
            <Button variant='primary' onClick={generatePassword}>
              <IconSparkles />
            </Button>
          </div>
          {
            errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )
          }
        
          <DialogFooter>
            <DialogClose>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="primary" submit>
              Save
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog ref={messageDialogRef} className='w-xl'>
        <DialogHeader>An error occured during request</DialogHeader>
        <DialogDescription>{errorMessage}</DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button variant='primary'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default AddCredential
