import useSWR from 'swr'
import { AnalyticsApiResponse } from '../../pages/api/analytics'
import { fetcher } from '@/utils/utils'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function StatsWithTrending() {
  const { data, error, isLoading } = useSWR<AnalyticsApiResponse, Error>('/api/getAnalytics', fetcher)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const stats = [
    {
      name: 'Events',
      value: data?.events.filter(e => e.type === 'event').length,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Commands',
      value: data?.events.filter(e => e.type === 'command').length,
      change: '+54.02%',
      changeType: 'negative',
    },
    {
      name: 'New Members',
      value: data?.events.filter(e => e.event === 'memberAdd').length,
      change: '-1.39%',
      changeType: 'positive',
    },
    {
      name: 'Messages Sent',
      value: data?.events.filter(e => e.event === 'messageCreate').length,
      change: '+10.18%',
      changeType: 'negative',
    },
  ]

  return (
    <dl className='mx-auto grid grid-cols-1 gap-2 bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map(stat => (
        <div
          key={stat.name}
          className='flex flex-wrap rounded-md items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8'
        >
          <dt className='text-sm font-medium leading-6 text-gray-500'>{stat.name}</dt>
          {/* <dd
            className={classNames(
              stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
              'text-xs font-medium'
            )}
          >
            {stat.change}
          </dd> */}
          <dd className='w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900'>
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
