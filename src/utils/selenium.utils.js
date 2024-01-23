import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";
import url from "url";
import fs from "fs";
import { waitForNewFile } from "./read.download.directory.utils.js";
import { genHash } from "./hash.utils.js";


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));


const downloadPath = path.join(__dirname, '../downloads');

// Configure Chrome options to specify the download directory
const chromeOptions = new chrome.Options().headless();
chromeOptions.setUserPreferences({
    'download.default_directory': downloadPath,
});

const fetchFiles = async (urls, hashValue, extension = '.txt') => {
    const data = []
    const anchorXPath = `//a[contains(text(),"download")]`
    try {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

        for (const url of urls) {
            try {
                await driver.executeScript('window.open("_blank")');
                const handles = await driver.getAllWindowHandles();
                await driver.switchTo().window(handles[handles.length - 1]);

                // Navigate to the URL
                await driver.get(url);

                const elements = await driver.wait(until.elementsLocated(By.xpath(anchorXPath)), 1000);

                // Use Actions class to perform mouse actions for each element
                const actions = driver.actions({ bridge: true });
                let flag = false;

                for (const element of elements) {
                    // Example: Move to the element and click
                    const hrefValue = await element.getAttribute('href');
                    if (hrefValue && hrefValue.toLowerCase().endsWith(extension)) {
                        await actions.move({ origin: element }).click().perform();
                        const pathname = new URL(hrefValue).pathname;
                        const fileName = path.basename(pathname);

                        const filePath = await waitForNewFile(fileName);

                        const newHash = await genHash(filePath);

                        fs.unlinkSync(filePath);

                        if (newHash === hashValue) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (flag) {
                    const temp = [url, 'matched'];
                    data.push(temp);
                }
                else {
                    const temp = [url, 'unmatched'];
                    data.push(temp);
                }
                await driver.quit();
            } catch (err) {
                const temp = [url, 'unmatched'];
                data.push(temp);
                await driver.quit();
            }
        }
    } catch (err) {
        console.log("Err : ", err);
    }
    return data;
}

export { fetchFiles }