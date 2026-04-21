'use client'

import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useGames } from '@/app/entities/api/games'
import { useGenres } from '@/app/entities/api/genres'
import { usePlatforms } from '@/app/entities/api/platforms'
import { FilterTypes, GamesListFilters } from '@/app/entities/models'
import { GenreFilter, PlatformFilter } from '@/app/entities/models'
import { Button } from '@/app/shared/ui/button'
import { ErrorState } from '@/app/shared/ui/error-state'
import { Input } from '@/app/shared/ui/input'
import { Label } from '@/app/shared/ui/label'
import { LoadingState } from '@/app/shared/ui/loading-state'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/app/shared/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/app/shared/ui/select'
import { Spinner } from '@/app/shared/ui/spinner'
import { GameCard } from '@/app/widgets/game-card'

interface IProps {}

export const GamesList: FC<Readonly<IProps>> = () => {
  const t = useTranslations('games')
  const tState = useTranslations('state')

  const [filters, setFilters] = useState<GamesListFilters>({
    search: '',
    genre: '',
    platform: '',
    filter: '',
    page: 1,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<GamesListFilters>({
    defaultValues: {
      search: '',
      genre: '',
      platform: '',
      filter: '',
      page: 1,
    },
  })

  const onSubmit = (filters: GamesListFilters) => {
    setFilters({ ...filters, page: 1 })
  }

  const {
    isLoading: isGamesLoading,
    isError: isGamesError,
    data: gamesData,
    error: gamesError,
    refetch: refetchGames,
  } = useGames(filters)
  const { isLoading: isGenresLoading, isError: isGenresError, data: genresData } = useGenres()
  const { isLoading: isPlatformsLoading, isError: isPlatformsError, data: platformsData } = usePlatforms()

  if (isGamesLoading) {
    return <LoadingState />
  }

  if (isGamesError) {
    return <ErrorState message={gamesError?.message} onRetry={refetchGames} />
  }

  const filtersPanel = (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      {/* Filters header */}
      <div className='flex items-baseline justify-between'>
        <div>
          <h2 className='font-heading text-lg font-semibold tracking-tight'>{t('filtersTitle')}</h2>
          <p className='text-muted-foreground mt-0.5 text-xs'>{t('filtersSubtitle')}</p>
        </div>

        <span className='bg-border ms-4 h-px flex-1' />
      </div>

      {/* Search */}
      <div className='space-y-1.5'>
        <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
          {t('searchLabel')}
        </Label>

        <Input type='text' placeholder={t('searchPlaceholder')} {...register('search')} className='w-full rounded-sm' />
      </div>

      {/* Genre */}
      <div className='space-y-1.5'>
        <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
          {t('genreLabel')}
        </Label>

        <Controller
          control={control}
          name='genre'
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ''}>
              <SelectTrigger className='w-full rounded-sm'>
                <SelectValue placeholder={t('genrePlaceholder')} />
              </SelectTrigger>

              <SelectContent>
                {isGenresLoading ? (
                  <SelectItem value='loading' disabled>
                    {tState('loading')}
                  </SelectItem>
                ) : isGenresError ? (
                  <SelectItem value='error' disabled>
                    {tState('errorLoading')}
                  </SelectItem>
                ) : (
                  genresData?.map((genre: GenreFilter) => (
                    <SelectItem key={genre.value} value={genre.label}>
                      {genre.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Platform */}
      <div className='space-y-1.5'>
        <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
          {t('platformLabel')}
        </Label>

        <Controller
          control={control}
          name='platform'
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ''}>
              <SelectTrigger className='w-full rounded-sm'>
                <SelectValue placeholder={t('platformPlaceholder')} />
              </SelectTrigger>

              <SelectContent>
                {isPlatformsLoading ? (
                  <SelectItem value='loading' disabled>
                    {tState('loading')}
                  </SelectItem>
                ) : isPlatformsError ? (
                  <SelectItem value='error' disabled>
                    {tState('errorLoading')}
                  </SelectItem>
                ) : (
                  platformsData?.map((platform: PlatformFilter) => (
                    <SelectItem key={platform.value} value={platform.label}>
                      {platform.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Order */}
      <div className='space-y-1.5'>
        <Label className='text-muted-foreground text-[11px] font-medium tracking-[0.18em] uppercase'>
          {t('orderLabel')}
        </Label>

        <Controller
          control={control}
          name='filter'
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ''}>
              <SelectTrigger className='w-full rounded-sm'>
                <SelectValue placeholder={t('orderPlaceholder')} />
              </SelectTrigger>

              <SelectContent>
                {isPlatformsLoading ? (
                  <SelectItem value='loading' disabled>
                    {tState('loading')}
                  </SelectItem>
                ) : isPlatformsError ? (
                  <SelectItem value='error' disabled>
                    {tState('errorLoading')}
                  </SelectItem>
                ) : (
                  <SelectGroup>
                    <SelectItem key={FilterTypes.RATINGASC} value={FilterTypes.RATINGASC}>
                      {t('filters.ratingAsc')}
                    </SelectItem>
                    <SelectItem key={FilterTypes.RATINGDESC} value={FilterTypes.RATINGDESC}>
                      {t('filters.ratingDesc')}
                    </SelectItem>
                    <SelectItem key={FilterTypes.YEARASC} value={FilterTypes.YEARASC}>
                      {t('filters.yearAsc')}
                    </SelectItem>
                    <SelectItem key={FilterTypes.YEARDESC} value={FilterTypes.YEARDESC}>
                      {t('filters.yearDesc')}
                    </SelectItem>
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Submit */}
      <Button
        type='submit'
        className={isSubmitting ? 'cursor-not-allowed rounded-sm opacity-50' : 'cursor-pointer rounded-sm'}
        disabled={isSubmitting}
      >
        {isSubmitting ? t('searching') : t('searchButton')}
      </Button>
    </form>
  )

  return (
    <div className='bg-background min-h-screen'>
      <main className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        {/* Page header */}
        <header className='mb-10 space-y-3'>
          <div className='flex items-center gap-3'>
            <span className='bg-foreground h-px w-8' />
            <span className='text-muted-foreground text-[11px] font-medium tracking-[0.25em] uppercase'>
              {t('pageKicker')}
            </span>
          </div>

          <h1 className='font-heading text-4xl font-semibold tracking-tight sm:text-5xl'>{t('pageTitle')}</h1>

          <p className='text-muted-foreground max-w-xl text-sm sm:text-base'>{t('pageSubtitle')}</p>
        </header>

        {/* Body */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-10'>
          {/* Sticky sidebar filters */}
          <aside className='lg:sticky lg:top-20 lg:self-start'>
            <div className='bg-card rounded-sm border p-5 shadow-sm lg:p-6'>{filtersPanel}</div>
          </aside>

          {/* Results */}
          <section>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
              {isGamesLoading ? (
                <div className='col-span-full flex items-center justify-center py-10'>
                  <Spinner className='h-6 w-6 animate-spin' />
                </div>
              ) : (
                gamesData?.results.map((game) => <GameCard key={game.id} game={game} />)
              )}

              {gamesData?.results.length === 0 && (
                <div className='text-muted-foreground col-span-full pt-12 pb-8 text-center text-lg'>{t('empty')}</div>
              )}
            </div>

            <Pagination className='mt-16 flex justify-center'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => gamesData?.previous && setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                    className={
                      !gamesData?.previous ? 'pointer-events-none rounded-sm opacity-50' : 'cursor-pointer rounded-sm'
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <span className='text-muted-foreground px-4 text-sm'>{filters.page}</span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => gamesData?.next && setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                    className={
                      !gamesData?.next ? 'pointer-events-none rounded-sm opacity-50' : 'cursor-pointer rounded-sm'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        </div>
      </main>
    </div>
  )
}
