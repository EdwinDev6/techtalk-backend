import app from "./app.js";
import "./database.js";
import "./libs/initialSetup.js";

app.listen(4000);
console.log("Server on port", 4000);