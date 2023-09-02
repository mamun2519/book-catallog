import jwt, { Secret } from 'jsonwebtoken'

export const generateToken = (
  data: Record<string, unknown>,
  secret: Secret,
  expiresIn: string,
): string => {
  return jwt.sign(data, secret, { expiresIn })
}
