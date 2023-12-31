import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { RootRoute } from './app/routes'
const app: Application = express()

// middleware
app.use([cors(), express.json(), express.urlencoded({ extended: true })])

// Test api
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server start Success..' })
})
//root routes
app.use('/api/v1', RootRoute)

//add to global error handler middleware
app.use(globalErrorHandler)

// not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(300).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  })
  next()
})
export default app
