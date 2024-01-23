import { Router } from "express";
import path from "path";
import url from "url";
import { upload } from "../middlewares/multer.middlewares.js";
import { genHash } from "../utils/hash.utils.js";
import { createExcel, getUrlsFromXlsx } from "../utils/excel.utils.js";
import { fetchFiles } from "../utils/selenium.utils.js";
import { clearPublicFolder } from "../utils/removeFiles.utils.js";


const router = Router();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

router.route("/").get((req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"))
})
router.route("/upload").post(
    upload.fields([
        {
            name:"inputFile",
            maxCount:1
        },
        {
            name: "excelFile",
            maxCount:1
        }
    ]),async (req,res,next)=>{
        const filePath = req.files.inputFile?.[0].path;
        if(filePath){
            const extension = path.extname(filePath)
            const hashValue = await genHash(filePath);
            const urls = await getUrlsFromXlsx(req.files.excelFile[0].path)
            const data = await fetchFiles(urls,hashValue,extension);
            createExcel(data);
            next();
        }
    },
    (req,res)=>{
        console.log("Success");
        res.sendFile(path.join(__dirname,'../outputs/output.xlsx'));
        clearPublicFolder();
    }
)

export default router