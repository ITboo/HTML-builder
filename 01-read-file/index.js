import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const read = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'text.txt');

    const errorMsg = "FS operation failed";

    const fileContent = await readFile(filePath, 'utf-8')
        .catch(() => {
            throw new Error(errorMsg)
        });
    console.log(fileContent);
};

await read();