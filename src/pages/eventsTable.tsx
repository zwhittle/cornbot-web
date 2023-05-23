import { AnalyticsEvent } from '@/utils/types'

const events = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

type Props = {
  events: AnalyticsEvent[]
}

export default function EventsTable({ events }: Props) {
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
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
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
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {events.map(event => (
                  <tr key={event.id}>
                    <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                      {event.type}
                      <dl className='font-normal lg:hidden'>
                        <dt className='sr-only'>Type</dt>
                        <dd className='mt-1 truncate text-gray-700'>{event.type}</dd>
                        <dt className='sr-only sm:hidden'>Guild</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.guildId}</dd>
                        <dt className='sr-only sm:hidden'>Channel</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.channelId}</dd>
                        <dt className='sr-only sm:hidden'>Member</dt>
                        <dd className='mt-1 truncate text-gray-500 sm:hidden'>{event.memberId}</dd>
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
