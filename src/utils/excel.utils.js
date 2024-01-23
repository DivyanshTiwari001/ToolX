import xlsx from 'node-xlsx';
import fs from "fs";
import path from "path";
import url from "url";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const getUrlsFromXlsx = async(filePath)=>{
    var obj = xlsx.parse(filePath);
    const data = obj[0].data;
    const urls = data.map(arr=>{
        const url = arr[0];
        return url;
    })
    return urls;
}

const createExcel = (data)=>{
    // Create a buffer from the data
    const buffer = xlsx.build([{ name: 'Sheet1', data: data }]);

    // Specify the output file path
    const outputPath = path.join(__dirname, '../outputs/output.xlsx');

    // Write the buffer to the Excel file
    fs.writeFileSync(outputPath, buffer, 'binary');
}

export {getUrlsFromXlsx,createExcel}