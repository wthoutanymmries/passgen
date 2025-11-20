import { useState } from 'react'
import { IconX, IconCopy } from '@tabler/icons-react'
import Button from './ui/Button'
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from './ui/Dialog'
import AddCredential from './AddCredential'

type Credentials = {
  service: string,
  login: string,
  password: string,
}

function PasswordManager() {
  const header = ['Service', 'Login', 'Password', 'Actions']
  const [data, setData] = useState<Credentials[] | undefined>(undefined)

  const triggerComponent =
    <DialogTrigger>
      <Button variant="secondary">
        Manage saved
      </Button>
    </DialogTrigger>

  const onOpen = () => {
    let credentials: Credentials[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const storageItem = localStorage.getItem(key)
        if (!storageItem) continue

        if (key === '__serviceList') {
          console.log(key, storageItem)
          continue
        }

        const item = JSON.parse(storageItem)
        if (!item) continue

        credentials.push({
          service: key,
          login: item.login,
          password: item.password,
        })
      }
    }

    setData(credentials)
  }

  const removeCredential = (service: string) => {
    localStorage.removeItem(service)

    if (!data) {
      return
    }

    setData(data.filter((value) => value.service !== service))
  }

  const copyToClipbard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    }
    catch (error) {
      console.log(error)
    }
  }

  const filterServices = (query: string) => {
    const serviceListStorageItem = localStorage.getItem('__serviceList')
    if (!serviceListStorageItem) return

    const serviceList = JSON.parse(serviceListStorageItem) as string[]
    if (!serviceList) return

    const filteredServices = serviceList.filter(
      (value: string) => value.toLowerCase().includes(
        query.toLowerCase()
      )
    )

    let result: Credentials[] = []

    filteredServices.forEach((key) => {
      const storageItem = localStorage.getItem(key)
      if (!storageItem) return

      const item = JSON.parse(storageItem) as { login: string, password: string }
      if (!item) return

      result.push({
        service: key,
        login: item.login,
        password: item.password,
      })
    })

    setData(result)
  }
  
  return (
    <Dialog trigger={triggerComponent} onOpen={onOpen} className='w-2/3 h-3/4'>
      <DialogHeader>Manage passwords</DialogHeader>
      <DialogDescription>
        Your vault is 100% local and private. Add entries or generate secure passwords below.
      </DialogDescription>

      <table className='mt-4 text-left text-sm table-fixed'>
        <thead className='sticky top-0'>
          <tr>
            {
              header.map((content, index) => {
                return (
                  <th scope="col" key={index} className='border-b pt-0 pb-3 pl-4 w-1/4'>
                    { content }
                  </th>
                )
              })
            }
          </tr>
        </thead>
      </table>

      <div className="flex-1 overflow-y-auto mb-6">
        <table className='w-full text-left text-sm table-fixed'>  
          <tbody className='overflow-y-auto'>
            {
              data && data.map((credentials, index) => {
                return (
                  <tr key={index}>
                    <th scope="row" className='p-4 border-b border-b-black/30 w-1/4'>
                      { credentials.service }
                    </th>
                    <td className='p-4 border-b border-b-black/30 w-1/4'>
                      { credentials.login }
                    </td>
                    <td className='p-4 border-b border-b-black/30 w-1/4'>
                      { '*'.repeat(9) }
                    </td>
                    <td className='p-4 border-b border-b-black/30 text-right w-1/4'>
                      <Button
                        variant='outline'
                        className='w-10 h-8'
                        onClick={() => copyToClipbard(credentials.password)}
                      >
                        <IconCopy />
                      </Button>
                      <Button
                        variant='primary'
                        className='w-10 h-8 ml-3'
                        onClick={() => removeCredential(credentials.service)}
                      >
                        <IconX />
                      </Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <DialogFooter>
        <input
          type="text"
          id="service-search"
          placeholder="Search services"
          className='outline-none border border-[#e9e4e5] px-2 rounded-md h-9 text-sm'
          onChange={(e) => filterServices(e.target.value)}
        />

        <DialogClose>
          <Button variant="outline">
            Close
          </Button>
        </DialogClose>
        {/* <Button variant="primary">
          Add
        </Button> */}
        <AddCredential onAddCredential={onOpen} />
      </DialogFooter>
    </Dialog>
  )
}

export default PasswordManager