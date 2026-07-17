import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./database";
import farmRoutes from "./routes/farm.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(farmRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
