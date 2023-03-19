// Routes
import indexRoutes from "./routes/index.routes.js";
import postRoutes from "./routes/post.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan')

// Settings
app.set("port", process.env.PORT);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", indexRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", usersRoutes);
app.use('/api/posts',postRoutes);

export default app;