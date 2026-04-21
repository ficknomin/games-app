import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type FC } from 'react'

import { RegisterModule } from '@/app/modules/register'

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.register' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface IProps {}

const RegisterPage: FC<Readonly<IProps>> = () => {
  return <RegisterModule />
}

export default RegisterPage
