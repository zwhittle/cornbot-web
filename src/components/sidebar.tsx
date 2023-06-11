import { Dialog, Transition } from '@headlessui/react'
import {
  Dispatch,
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
  SVGProps,
  SetStateAction,
  useState,
} from 'react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import SidebarBase from './SidebarBase'
import useSWR from 'swr'
import { GuildsResponse } from '@/pages/api/getGuilds'
import { fetcher } from '@/utils/utils'

type SidebarProps = {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  selectedItem: string
  setSelectedItem: Dispatch<SetStateAction<string>>
  navItems: {
    name: string
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined
        titleId?: string | undefined
      } & RefAttributes<SVGSVGElement>
    >
  }[]
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  selectedItem,
  setSelectedItem,
  navItems
}: SidebarProps) {
  return (
    <Fragment>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50 xl:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/80' />
          </Transition.Child>

          <div className='fixed inset-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                    <button
                      type='button'
                      className='-m-2.5 p-2.5'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>

                {/* Sidebar component, swap this element with another sidebar if you like */}
                <SidebarBase navItems={navItems} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <SidebarBase navItems={navItems} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </div>
    </Fragment>
  )
}
