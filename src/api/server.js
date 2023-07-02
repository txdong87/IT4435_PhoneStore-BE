import express from "express";
import bodyParser from "body-parser";
import { route } from "./route/index.js";
import cors from "cors";
const app = express();
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Định nghĩa các route và controller ở đây
route(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}. http://localhost:${port}`);
});
