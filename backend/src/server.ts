import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { rateLimit } from "express-rate-limit";
import { HealthRouter } from "./modules/health/health.route";
import ErrorHandler from "./middlewares/error.middleware";

const app = express();
const PORT = 9000;

app.use(cors());

app.use("/health", HealthRouter);

const httpServer = createServer(app);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false, 
  ipv6Subnet: 56,
});

app.use(limiter);

app.use(ErrorHandler);

httpServer.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
