import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { rateLimit } from "express-rate-limit";
import { HealthRouter } from "./modules/health/health.route";
import ErrorHandler from "./middlewares/error.middleware";
import { AuthRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 9000;

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/health", HealthRouter);

app.use(express.json());
app.use(cookieParser());

const httpServer = createServer(app);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: { message: "Too many requests, please try again later." },
});

app.use(limiter);

app.use("/api/auth", AuthRouter);

app.use(ErrorHandler);

httpServer.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
