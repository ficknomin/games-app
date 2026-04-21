'use client'

import { type FC, type ReactNode, useEffect } from 'react'

import { refreshSession } from '@/app/entities/api/session'
import { useSessionStore } from '@/app/shared/store/session.store'

interface IProps {
  children: ReactNode
}

export const SessionProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props
  const { setSession, setInitialised } = useSessionStore()

  useEffect(() => {
    refreshSession().then((result) => {
      if (result.success) {
        setSession(result.accessToken, result.user)
      }
      setInitialised()
    })
  }, [setSession, setInitialised])

  return <>{children}</>
}
