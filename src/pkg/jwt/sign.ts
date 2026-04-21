import { SignJWT } from 'jose'

import { JWT_CONFIG } from './constant'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export type JwtPayload = {
  userId: string
  email: string
  username: string
}

export const signAccessToken = async (payload: JwtPayload): Promise<string> => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_CONFIG.accessTokenExpiry)
    .sign(secret)
}
