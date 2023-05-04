import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const list = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const errorMsg = "FS operation failed";

    const dirPath = path.join(__dirname, 'secret-folder');

    const listFile = await readdir(dirPath)
        .catch(() => {
            throw new Error(errorMsg)
        });
    console.log(listFile);
}

await list();