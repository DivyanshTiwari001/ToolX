import fs from 'fs';
import path from "path";
import url from "url";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const clearPublicFolder =()=>{
    const dirPath = path.join(__dirname,'../public/temp');
    const files = fs.readdirSync(dirPath);
    files.forEach(filename=>{
        fs.unlinkSync(path.join(dirPath,filename));
    })
}

export {clearPublicFolder}