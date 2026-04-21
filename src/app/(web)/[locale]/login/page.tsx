import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type FC } from 'react'

import { LoginModule } from '@/app/modules/login'

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.login' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface IProps {}

const LoginPage: FC<Readonly<IProps>> = () => {
  return <LoginModule />
}

export default LoginPage
