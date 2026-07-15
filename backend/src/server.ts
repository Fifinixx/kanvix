import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { rateLimit } from "express-rate-limit";
import { HealthRouter } from "./modules/health/health.route";
import JwtValidateMiddleware from "./middlewares/jwt.middleware";
import ErrorHandler from "./middlewares/error.middleware";
import { AuthRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { ApplicationRouter } from "./modules/application/application.route";
import { UserRouter } from "./modules/user/user.routes";
import { OrganizationRouter } from "./modules/organization/organization.route";
import { ProjectRouter } from "./modules/project/project.routes";


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
// TODO: need to add this per route.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: { message: "Too many requests, please try again later." },
});

app.use(limiter);

app.use("/api/auth", AuthRouter);
// use grouping if lists get bigger
app.use("/api/user", JwtValidateMiddleware, UserRouter);
app.use("/api/organization", JwtValidateMiddleware, OrganizationRouter);
app.use("/api/project", JwtValidateMiddleware, ProjectRouter);
app.use("/application", JwtValidateMiddleware, ApplicationRouter);
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "The requested resource could not be found.",
  });
});
app.use(ErrorHandler);

httpServer.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
