import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stdin } from 'process';
import { errorMsg } from '../constants/messages.js';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'new.txt');

    const writeStream = createWriteStream(filePath);

    console.log("Welcome to your new file. Feel free to put anything to it");

    stdin.pipe(writeStream);

    writeStream.on('error', (error) => {
        throw error (errorMsg);
    })

   /* writeStream.on('exit', () => {
        stdin.
        console.log('Thank you. Bye!');
    })*/

};

await write();