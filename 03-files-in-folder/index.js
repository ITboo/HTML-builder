import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorMsg } from '../constants/messages.js';

export const list = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const dirPath = path.join(__dirname, 'secret-folder');

    const listFile = await readdir(dirPath)
        .catch(() => {
            throw new Error(errorMsg)
        });
    console.log(listFile);
}

await list();