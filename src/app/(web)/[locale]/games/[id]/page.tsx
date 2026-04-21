import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { fetchGame } from '@/app/entities/api/games'
import { GameDetails } from '@/app/widgets/game-details'

type GamePageProps = {
  params: Promise<{
    id: string
    locale: string
  }>
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id, locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const game = await fetchGame(id)

  if (!game) {
    return { title: t('gameNotFound') }
  }

  return {
    title: game.name,
    description: t('gameDescription', { name: game.name }),
    openGraph: {
      title: game.name,
      images: game.background_image ? [game.background_image] : [],
    },
  }
}

const GamePage = async ({ params }: GamePageProps) => {
  const { id } = await params

  const game = await fetchGame(id)
  if (!game) {
    notFound()
  }

  return <GameDetails id={id} />
}

export default GamePage
