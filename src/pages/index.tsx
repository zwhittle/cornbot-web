import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
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
import { Guild } from '@/utils/types'
import useSWR from 'swr'
import { ApiData } from './api/get_data'
import { fetcher } from '@/utils/utils'
import Sidebar from '@/components/sidebar'
import SortDropdown from '@/components/SortDropdown'
import GuildsList from '@/components/GuildsList'

const navigation = [
  { name: 'Guilds', href: '#', icon: FolderIcon, current: true },
  { name: 'Members', href: '#', icon: ServerIcon, current: false },
  { name: 'Analytics', href: '#', icon: SignalIcon, current: false },
  { name: 'Tours', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data, error, isLoading } = useSWR<ApiData>('/api/get_data', fetcher)

  if (error) return <p>Error: {error}</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {data ? (
        <div>
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
                    <Sidebar guilds={data.guilds} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className='hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <Sidebar guilds={data.guilds} />
          </div>

          <div className='xl:pl-72'>
            {/* Sticky search header */}
            <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8'>
              <button
                type='button'
                className='-m-2.5 p-2.5 text-white xl:hidden'
                onClick={() => setSidebarOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <Bars3Icon className='h-5 w-5' aria-hidden='true' />
              </button>

              <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
                <form className='flex flex-1' action='#' method='GET'>
                  <label htmlFor='search-field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full'>
                    <MagnifyingGlassIcon
                      className='pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500'
                      aria-hidden='true'
                    />
                    <input
                      id='search-field'
                      className='block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm'
                      placeholder='Search...'
                      type='search'
                      name='search'
                    />
                  </div>
                </form>
              </div>
            </div>

            <main className='lg:pr-96'>
              <header className='flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
                <h1 className='text-base font-semibold leading-7 text-white'>Guilds</h1>

                {/* Sort dropdown */}
                <SortDropdown />
              </header>

              {/* Deployment list */}
              <GuildsList guilds={data.guilds} />
            </main>

            {/* Activity feed */}
            <aside className='bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5'>
              <header className='flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
                <h2 className='text-base font-semibold leading-7 text-white'>Activity feed</h2>
                <a href='#' className='text-sm font-semibold leading-6 text-indigo-400'>
                  View all
                </a>
              </header>
              <ul role='list' className='divide-y divide-white/5'>
                {/* {activityItems.map(item => (
                <li key={item.commit} className='px-4 py-4 sm:px-6 lg:px-8'>
                  <div className='flex items-center gap-x-3'>
                    <img
                      src={item.user.imageUrl}
                      alt=''
                      className='h-6 w-6 flex-none rounded-full bg-gray-800'
                    />
                    <h3 className='flex-auto truncate text-sm font-semibold leading-6 text-white'>
                      {item.user.name}
                    </h3>
                    <time dateTime={item.dateTime} className='flex-none text-xs text-gray-600'>
                      {item.date}
                    </time>
                  </div>
                  <p className='mt-3 truncate text-sm text-gray-500'>
                    Pushed to <span className='text-gray-400'>{item.projectName}</span> (
                    <span className='font-mono text-gray-400'>{item.commit}</span> on{' '}
                    <span className='text-gray-400'>{item.branch}</span>)
                  </p>
                </li>
              ))} */}
              </ul>
            </aside>
          </div>
        </div>
      ) : (
        <p>No Data</p>
      )}
    </>
  )
}
