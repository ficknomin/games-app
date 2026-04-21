'use client'

import { useLocale } from 'next-intl'
import { type FC, useTransition } from 'react'

import { Button } from '@/app/shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/shared/ui/dropdown-menu'
import { routing, usePathname, useRouter } from '@/pkg/locale'

interface IProps {}

export const LocaleSwitcher: FC<Readonly<IProps>> = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='rounded-sm uppercase hover:cursor-pointer' disabled={isPending}>
          {locale}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-24 rounded-xs' align='end'>
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className='uppercase hover:cursor-pointer'
            disabled={l === locale}
          >
            {l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
