import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorMsg } from '../constants/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'text.txt');

const readFile = async () => {
    return new Promise((resolve, reject) => {
        const readStream = createReadStream(filePath);

        readStream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        readStream.on('end', () => {
            resolve();
        });

        readStream.on('error', (error) => {
            reject(error);
            console.log(errorMsg)
        });
    });

};

await readFile();