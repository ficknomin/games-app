import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type FC } from 'react'

import { HomePage } from '@/app/modules/home'

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.gamesHub' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface IProps {}

const Home: FC<Readonly<IProps>> = () => {
  return <HomePage />
}

export default Home
