import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { PageShell } from '@/app/widgets/page-shell'

interface IProps {
  children: ReactNode
}

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.games' })

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
  }
}

const GamesLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return <PageShell>{children}</PageShell>
}

export default GamesLayout
