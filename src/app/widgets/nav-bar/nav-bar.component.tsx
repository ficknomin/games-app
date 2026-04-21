'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/shared/ui/navigation-menu'
import { Link } from '@/pkg/locale'

import { LocaleSwitcher, UserButton } from './elements'

interface IProps {}

export const NavBar: FC<Readonly<IProps>> = () => {
  const t = useTranslations('nav')

  return (
    <div className='bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6'>
        {/* Brand */}
        <Link href='/' className='group flex items-center gap-2 rounded-sm'>
          <span className='font-heading hidden text-sm font-semibold tracking-[0.18em] uppercase sm:inline'>
            {t('brand')}
          </span>
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className='flex items-center justify-start gap-1'>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/' className='rounded-sm'>
                  {t('home')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href='/games' className='rounded-sm'>
                  {t('allGames')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link data-testid='nav-favorites-link' href='/games/favorites' className='rounded-sm'>
                  {t('favorites')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Controls */}
        <div className='flex items-center gap-1'>
          <LocaleSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  )
}
