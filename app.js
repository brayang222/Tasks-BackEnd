import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routesTask from "./routes/tasks.js";
import routesUsers from "./routes/users.js";
import client from "./config/client.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", routesTask);
app.use("/users", routesUsers);

const server = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);

process.on("SIGINT", async () => {
  console.log("Closing server...");
  server.close(async () => {
    await client.disconnect();
    console.log("Server closed");
    process.exit(0);
  });
});
