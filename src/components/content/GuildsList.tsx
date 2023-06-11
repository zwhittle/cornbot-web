
import { GuildsResponse } from '@/pages/api/guilds'
import { Guild } from '@/utils/types'
import { fetcher } from '@/utils/utils'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { format, parseJSON } from 'date-fns'
import useSWR from 'swr'

export default function GuildsList() {
  const { data, error, isLoading } = useSWR<GuildsResponse>('/api/guilds', fetcher)

  if (error) return <p>Error: {error}</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {data ? (
        <ul role='list' className='flex gap-12 justify-center mt-3'>
          {data.guilds.map(guild => (
            <li
              key={guild.id}
              className='col-span-1 flex flex-col divide divide-gray-200 rounded-lg bg-white text-center shadow'
            >
              <div className='flex flex-1 flex-col p-8'>
                <img
                  className='mx-auto h-32 w-32 flex-shrink-0 rounded-full'
                  src={guild.icon}
                  alt=''
                />
                <h3 className='mt-6 text-sm font-medium text-gray-900'>{guild.name}</h3>
                <dl className='mt-1 flex flex-grow flex-col justify-between'>
                  <dt className='sr-only'>Members</dt>
                  <dd className='text-sm text-gray-500'>{guild.memberCount} Members</dd>
                  <dt className='sr-only'>Created At</dt>
                  <dd className='mt-3'>
                    <span className='inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                      {format(parseJSON(guild.discordCreatedAt), 'dd MMM yyyy HH:mm:ss')}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                {/* <div className='-mt-px flex divide-x divide-gray-200'>
              <div className='flex w-0 flex-1'>
                <a
                  href={`#`}
                  className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900'
                >
                  <EnvelopeIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  Email
                </a>
              </div>
              <div className='-ml-px flex w-0 flex-1'>
                <a
                  href={`#`}
                  className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900'
                >
                  <PhoneIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  Call
                </a>
              </div>
            </div> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Data</p>
      )}
    </>
  )
}
