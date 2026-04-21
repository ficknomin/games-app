'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useGame } from '@/app/entities/api/games'
import { Badge } from '@/app/shared/ui/badge'
import { ErrorState } from '@/app/shared/ui/error-state'
import { LoadingState } from '@/app/shared/ui/loading-state'

interface IProps {
  id: string
}

export const GameDetails: FC<Readonly<IProps>> = (props) => {
  const { id } = props
  const t = useTranslations('games')
  const { isLoading, isError, data, error, refetch } = useGame(id)

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState message={error?.message} onRetry={refetch} />
  }

  if (!data) return null

  return (
    <div className='bg-background mt-12 flex flex-1 flex-col items-center justify-center px-4'>
      <div className='w-full max-w-4xl space-y-4'>
        <div className='bg-card overflow-hidden rounded-sm shadow-md'>
          <div className='relative flex h-96 w-full'>
            <Image src={data.background_image} alt={data.name} fill className='object-cover' priority />

            <div className='from-card via-card/31 absolute inset-0 bg-linear-to-t to-transparent' />

            {data.metacritic && (
              <div className='bg-card absolute top-4 right-4 flex flex-col items-center rounded-sm border border-green-500/50 px-3 py-1.5'>
                <span className='text-lg leading-none font-bold text-green-400'>{data.metacritic}</span>
                <span className='text-muted-foreground mt-0.5 text-[10px]'>{t('metacritic')}</span>
              </div>
            )}
          </div>

          <div className='relative -mt-8 px-6 pb-6'>
            <div className='flex flex-wrap items-end justify-between gap-4'>
              <div>
                <h1 data-testid='game-detail-title' className='text-2xl font-bold'>
                  {data.name}
                </h1>
                <div className='mt-1 flex flex-wrap items-center gap-2'>
                  <span className='text-muted-foreground text-sm'>
                    {data.released ? data.released.split('-')[0] : t('tba')}
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-4 flex flex-wrap items-center gap-2'>
              {data.genres.map((genre) => (
                <Badge key={genre} variant='secondary' className='text-foreground rounded-sm text-xs'>
                  {genre}
                </Badge>
              ))}
              {data.platforms.map((platform) => (
                <span key={platform} className='text-muted-foreground text-xs'>
                  {platform} ·
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
