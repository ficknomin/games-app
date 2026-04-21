import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type FC } from 'react'

import { FavoritesList } from '@/app/modules/favorites-list'

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'metadata.favorites',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface IProps {}

const FavoritesPage: FC<Readonly<IProps>> = () => {
  return <FavoritesList />
}

export default FavoritesPage
