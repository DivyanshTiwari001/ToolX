import appExpress from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
})


const port = process.env.PORT || 8000;

appExpress.listen(port,()=>{
  console.log( `Application is running on "http://localhost:${port}/"`)
})

appExpress.on('errron',(err)=>{
  console.log(err);
})