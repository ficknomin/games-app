import { type FC } from 'react'

import { Spinner } from '@/app/shared/ui/spinner'

interface IProps {}

export const LoadingState: FC<Readonly<IProps>> = () => {
  return (
    <div className='flex min-h-screen'>
      <Spinner className='max-w-* mx-auto my-auto h-8 w-8 animate-spin' />
    </div>
  )
}
