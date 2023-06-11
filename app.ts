import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import apiRouter from "./routers";
import configurePassport from "./passport";

const app = express();
dotenv.config();

// DB 연결
const DB_URL =
  process.env.MONGODB_URI || "MongoDB의 서버 주소와 env 파일을 확인해보세요!";
mongoose.connect(DB_URL, { dbName: "EarF" });
const db = mongoose.connection;
db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다!  " + DB_URL)
);
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

app.use(cors());
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱
app.use(express.static("public")); // 정적 파일 서비스

// Passport 초기화
app.use(passport.initialize());
configurePassport(passport);

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("This is the EarF HOME PAGE");
});

// 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("뭔가 잘못된 것 같습니다.");
});

const port = process.env.PORT as string;
const url = process.env.URL as string;

app.listen(port, () => {
  console.log(`
    #############################################
        🛡️ Server listening on ${url}:${port} 🛡️
    #############################################    
    `);
});
