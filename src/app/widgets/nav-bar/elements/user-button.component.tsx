'use client'

import { UserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { signOut } from '@/app/features/auth'
import { useSessionStore } from '@/app/shared/store'
import { Button } from '@/app/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/app/shared/ui/dropdown-menu'
import { Link } from '@/pkg/locale'

interface IProps {}

export const UserButtonComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('userMenu')
  const user = useSessionStore((s) => s.user)
  const clearSession = useSessionStore((s) => s.clearSession)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='rounded-sm hover:cursor-pointer'>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40 rounded-xs'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>

          {user ? (
            <DropdownMenuItem
              onClick={() => {
                clearSession()
                signOut()
              }}
              className='hover:cursor-pointer'
            >
              {t('signOut')}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link href='/login'>{t('signIn')}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link href='/register'>{t('signUp')}</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
