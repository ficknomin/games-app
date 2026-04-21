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
import { useRouter } from '@/pkg/locale'

interface IProps {}

export const UserButton: FC<Readonly<IProps>> = () => {
  const t = useTranslations('userMenu')
  const user = useSessionStore((s) => s.user)
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='rounded-sm hover:cursor-pointer'>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40 rounded-xs' align='start'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>

          {user ? (
            <DropdownMenuItem
              onClick={() => {
                signOut()
                router.push('/')
              }}
              className='hover:cursor-pointer'
            >
              {t('signOut')}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={() => router.push('/login')} className='hover:cursor-pointer'>
                {t('signIn')}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => router.push('/register')} className='hover:cursor-pointer'>
                {t('signUp')}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
