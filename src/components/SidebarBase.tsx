import {
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/react/24/outline'
import useSWR from 'swr'
import { GuildsResponse } from '@/pages/api/getGuilds'
import { fetcher } from '@/utils/utils'
import { useSession } from 'next-auth/react'

const navigation = [
  { name: 'Guilds', href: '#', icon: FolderIcon, current: true },
  { name: 'Members', href: '#', icon: ServerIcon, current: false },
  { name: 'Analytics', href: '#', icon: SignalIcon, current: false },
  { name: 'Tours', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

export default function SidebarBase() {
  const { data, error, isLoading } = useSWR<GuildsResponse>('/api/getGuilds', fetcher)
  const { data: session, status: sessionStatus } = useSession()

  if (error) return <p>Error: {error}</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10'>
      <div className='flex h-16 shrink-0 items-center'>
        <img
          className='h-8 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
          alt='Cornbot'
        />
      </div>
      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map(item => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`${
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    } group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
                  >
                    <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className='text-xs font-semibold leading-6 text-gray-400'>Your guilds</div>
            {data && (
              <ul role='list' className='-mx-2 mt-2 space-y-1'>
                {data.guilds.map(guild => (
                  <li key={guild.name}>
                    <a
                      href={'#'}
                      className='text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    >
                      <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                        {guild.name[0]}
                      </span>
                      <span className='truncate'>{guild.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {sessionStatus === 'authenticated' && (
            <li className='-mx-6 mt-auto'>
              <a
                href='#'
                className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800'
              >
                {session.user.image && (
                  <img
                    className='h-8 w-8 rounded-full bg-gray-800'
                    src={session.user.image}
                    alt=''
                  />
                )}
                <span className='sr-only'>Your profile</span>
                <span aria-hidden='true'>{session.user.name}</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
