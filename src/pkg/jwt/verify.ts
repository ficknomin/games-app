import { jwtVerify } from 'jose'

import { JwtPayload } from './sign'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export const verifyAccessToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JwtPayload
  } catch {
    return null // expired or tampered
  }
}
