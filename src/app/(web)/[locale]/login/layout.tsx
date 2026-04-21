import { type FC, type ReactNode } from 'react'

import { PageShell } from '@/app/widgets/page-shell'

interface IProps {
  children: ReactNode
}

const LoginLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return <PageShell>{children}</PageShell>
}

export default LoginLayout
