import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";

app.listen(3000);
console.log("Server on port", 3000);