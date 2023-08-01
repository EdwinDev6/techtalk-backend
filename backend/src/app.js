import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import indexRoutes from "./routes/index.routes.js";
import postRoutes from "./routes/post.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import fileUpload from "express-fileupload";
const app = express();

app.set("port", 4000);
app.set("json spaces", 4);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    resource_type: "auto",
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);

export default app;
