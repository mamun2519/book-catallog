import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export const env_config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
}
