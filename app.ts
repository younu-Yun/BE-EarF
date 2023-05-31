import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import createError from "http-errors";
import cors, { CorsOptions } from "cors";
// Routers
import apiRouter from "./routers";

const app = express();
dotenv.config();

// DB 연결
const mongodbURI = process.env.MONGODB_URI as string;
mongoose
  .connect(mongodbURI ?? "mongodb://localhost:27017", {})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error: any) => {
    console.log("MongoDB Connection Error: ", error);
  });

app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱
app.use(express.static("public")); // 정적 파일 서비스

const corsOptions: CorsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("this is EarF HOME PAGE");
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

const port = process.env.PORT as string;
app.listen(port, () => {
  console.log(`
    #############################################
        🛡️ Server listening on port: ${port} 🛡️
    #############################################    
    `);
});
