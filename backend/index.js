import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRouter from "./src/route/accountRoute.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", accountRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
