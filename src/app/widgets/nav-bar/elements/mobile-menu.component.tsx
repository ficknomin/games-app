'use client'

import { GamepadIcon, HeartIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserPlusIcon } from 'lucide-react'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/shared/ui/dropdown-menu'
import { useRouter } from '@/pkg/locale'

interface IProps {}

export const MobileMenuComponent: FC<Readonly<IProps>> = () => {
  const tNav = useTranslations('nav')
  const tUser = useTranslations('userMenu')
  const router = useRouter()
  const user = useSessionStore((s) => s.user)
  const clearSession = useSessionStore((s) => s.clearSession)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-sm'>
          <MenuIcon className='size-5' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48' align='end'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{tNav('navigation')}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push('/')} className='cursor-pointer'>
            <HomeIcon />
            {tNav('home')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/games')} className='cursor-pointer'>
            <GamepadIcon />
            {tNav('allGames')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/games/favorites')} className='cursor-pointer'>
            <HeartIcon />
            {tNav('favorites')}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{tUser('myAccount')}</DropdownMenuLabel>
          {user ? (
            <DropdownMenuItem
              onClick={() => {
                clearSession()
                signOut()
              }}
              className='cursor-pointer'
            >
              <LogOutIcon />
              {tUser('signOut')}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={() => router.push('/login')} className='cursor-pointer'>
                <LogInIcon />
                {tUser('signIn')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/register')} className='cursor-pointer'>
                <UserPlusIcon />
                {tUser('signUp')}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
