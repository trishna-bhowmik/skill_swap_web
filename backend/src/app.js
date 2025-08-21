import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// ✅ Only this CORS config — place before routes
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// ✅ Routes
import userRouter from './routes/user.routes.js';
app.use("/api/v1/users", userRouter);

export { app };
