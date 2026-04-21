import { type FC } from 'react'

import { GamesList } from '@/app/modules/games-list'

export const revalidate = 3600

interface IProps {}

const GamesPage: FC<Readonly<IProps>> = () => {
  return <GamesList />
}

export default GamesPage
