import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import farmRoutes from "./routes/farm.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { error: { code: 429, message: "Too many requests, please try again later." } },
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(farmRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
