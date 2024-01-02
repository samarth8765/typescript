import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import http from "http";
import { connect } from "./db/db";
import router from "./router/index";

connect("vizzDB");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());

const server = http.createServer(app);

app.use("/", router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
