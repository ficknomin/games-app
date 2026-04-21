import { type FC, type ReactNode } from 'react'

import { NavBar } from '@/app/widgets/nav-bar'

interface IProps {
  children: ReactNode
}

export const PageShell: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  return (
    <div className='flex min-h-full w-full flex-col'>
      <NavBar />

      {children}
    </div>
  )
}
