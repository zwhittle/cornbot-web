import { AnalyticsApiData } from '@/pages/api/getAnalytics'
import { AnalyticsEvent } from '@/utils/types'
import { fetcher } from '@/utils/utils'
import { format } from 'date-fns'
import useSWR from 'swr'

export default function EventsTable() {
  const { data, error, isLoading } = useSWR<AnalyticsApiData, Error>('/api/getAnalytics', fetcher)

  if (error) return <p>Error</p>
  if (!data) return <p>Loading...</p>

  return (
    <div className='mt-8 flow-root'>
      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-2'
                  >
                    Type
                  </th>
                  <th
                    scope='col'
                    className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
                  >
                    Event
                  </th>
                  <th
                    scope='col'
                    className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                  >
                    Guild
                  </th>
                  <th
                    scope='col'
                    className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                  >
                    Channel
                  </th>
                  <th
                    scope='col'
                    className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                  >
                    Member
                  </th>
                  <th
                    scope='col'
                    className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {data.events && data.events.map(event => (
                  <tr key={event.id}>
                    <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-2'>
                      {event.type}
                      <dl className='font-normal lg:hidden'>
                        <dt className='sr-only'>Type</dt>
                        <dd className='mt-1 truncate text-gray-700'>{event.event}</dd>
                        <dt className='sr-only sm:hidden'>Guild</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.guildId}</dd>
                        <dt className='sr-only sm:hidden'>Channel</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.channelId}</dd>
                        <dt className='sr-only sm:hidden'>Member</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.memberId}</dd>
                        <dt className='sr-only sm:hidden'>Timestamp</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.timestamp?.toString()}</dd>
                      </dl>
                    </td>
                    <td className='hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'>
                      {event.event}
                    </td>
                    <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                      {event.guildId}
                    </td>
                    <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                      {event.channelId}
                    </td>
                    <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                      {event.memberId}
                    </td>
                    <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                      {event.timestamp?.toLocaleString('en-us', {timeZone: 'CST'})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
