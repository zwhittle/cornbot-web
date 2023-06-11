import { MembersResponse } from '@/pages/api/getMembers'
import { Guild } from '@/utils/types'
import { fetcher } from '@/utils/utils'
import { EllipsisVerticalIcon, PencilIcon } from '@heroicons/react/20/solid'
import useSWR from 'swr'

type MembersListProps = {
  guild: Guild
}

export default function MembersList({ guild }: MembersListProps) {
  const { data, error, isLoading } = useSWR<MembersResponse>(`/api/guilds/${guild.id}/members`, fetcher)

  if (error) return <p>Error: {error}</p>
  if (isLoading) return <p>Loading...</p>
  return (
    <>
      {data ? (
        <ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {data.members.map(member => (
            <li
              key={member.id}
              className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'
            >
              <div className='flex w-full items-center justify-between space-x-6 p-6'>
                <div className='flex-1 truncate'>
                  <div className='flex items-center space-x-3'>
                    <h3 className='truncate text-sm font-medium text-gray-900'>
                      {member.displayName}
                    </h3>
                    {/* <span className='inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                      {format(parseJSON(member.joinedAt), 'dd MMM yyyy HH:mm:ss')}
                    </span> */}
                  </div>
                  <p className='mt-1 truncate text-sm text-gray-500'>{member.nickname}</p>
                </div>
                <img
                  className='h-10 w-10 flex-shrink-0 rounded-full bg-gray-300'
                  src={member.avatar}
                  alt=''
                />
              </div>
              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  <div className='flex w-0 flex-1'>
                    <a
                      href={`#`}
                      className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900'
                    >
                      <PencilIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      Edit
                    </a>
                  </div>
                  <div className='-ml-px flex w-0 flex-1'>
                    <a
                      href={`#`}
                      className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900'
                    >
                      <EllipsisVerticalIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      Actions
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </>
  )
}
