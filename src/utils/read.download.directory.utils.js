import fs from "fs";
import path from "path";
import url from "url";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));


async function waitForNewFile(orgFileName) {
    const directoryPath = path.join(__dirname,'../downloads')
    return new Promise((resolve, reject) => {
      // Create a watcher for the specified directory
      const watcher = fs.watch(directoryPath, { persistent: false });
  
      // Event handler for the 'change' event
      const onChange = (eventType, filename) => {
        // Check if the event is a 'rename' event (indicating a new file was added)
        if (eventType == 'rename' && filename===orgFileName) {
          // Stop watching the directory
          watcher.close();
          // Resolve the promise with the full path to the new file
          resolve(path.join(directoryPath, filename));
        }
      };
  
      // Event handler for the 'error' event
      const onError = (error) => {
        // Stop watching the directory
        watcher.close();
        // Reject the promise with the error
        reject(error);
      };
  
      // Attach event handlers
      watcher.on('change', onChange);
      watcher.on('error', onError);
    });
  }
  

export { waitForNewFile }
