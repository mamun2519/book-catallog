import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// middleware
app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(300).json({
    success: false,
    message: "Not Found",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found" }],
  });
  next();
});
export default app;
