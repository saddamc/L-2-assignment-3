import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import routes from "./modules/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.send("✅ Library Management System ✅");
});

app.listen(config.port, () => {
  console.log(`✅ Server Running on port ${5000}`);
});

async function server() {
  try {
    // console.log(config);
    await mongoose.connect(config.database_url!);

    console.log(`✅ Connected to database`);
  } catch (error) {
    console.error(`server error ${server}`);
  }
}

server();
