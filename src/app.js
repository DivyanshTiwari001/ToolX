import express from "express";
import path from "path";
import url from "url";
import cors from "cors";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app  = express()

app.use(cors())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"frontend")))

// routes import 

import userRouter from "./routes/user.routes.js"

app.use("/",userRouter)

export default app;