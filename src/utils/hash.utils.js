import crypto from "crypto";
import fs from "fs";

const genHash = (filePath,algorithm = 'sha256')=>{
    return new Promise((resolve,reject)=>{
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);
        stream.on('data',data=>{
            hash.update(data);
        });
        stream.on('end',()=>{
            const fileHash = hash.digest('hex');
            resolve(fileHash);
        });
        stream.on('error',error=>{
            reject(error);
        });
    });
}

export {genHash}