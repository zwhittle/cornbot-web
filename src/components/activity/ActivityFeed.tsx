import { AnalyticsApiResponse } from '@/pages/api/analytics'
import { fetcher } from '@/utils/utils'
import { formatDistanceToNow, parseISO } from 'date-fns'
import useSWR from 'swr'

export default function ActivityFeed() {
  const { data, error, isLoading } = useSWR<AnalyticsApiResponse, Error>('/api/analytics', fetcher)

  if (error) return <p>Error</p>
  if (!data) return <p>Loading...</p>

  data.events.sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))

  return (
    <ul role='list' className='divide-y divide-gray-800 py-1 px-3'>
      {data.events.map(event => (
        <li key={event.id} className='flex justify-between gap-x-6 py-5'>
          <div className='flex gap-x-4'>
            <img
              className='h-12 w-12 flex-none rounded-full bg-gray-800'
              src={event.member ? event.member.avatar : event.guild.icon}
              alt=''
            />
            <div className='min-w-0 flex-auto'>
              <p className='text-sm font-semibold leading-6 text-white'>
                {event.message
                  ? `message: ${event.message.content}`
                  : `${event.type}: ${event.event}`}
              </p>
              <p className='mt-1 truncate text-xs leading-5 text-gray-400'>
                {event.member?.displayName}
              </p>
            </div>
          </div>
          <div className='hidden sm:flex sm:flex-col sm:items-end'>
            <p className='text-sm leading-6 text-white'>{event.guild.name}</p>
            {event.timestamp && (
              <p className='mt-1 text-xs leading-5 text-gray-400'>
                {formatDistanceToNow(parseISO(event.timestamp))} ago
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
