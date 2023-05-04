import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stdin } from 'process';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'new.txt');

    const errorMessage = "FS operation failed";

    const writeStream = createWriteStream(filePath);

    console.log("Welcome to your new file. Feel free to put anything to it");

    stdin.pipe(writeStream);

    writeStream.on('error', (error) => {
        throw error (errorMessage);
    })

   /* writeStream.on('exit', () => {
        stdin.
        console.log('Thank you. Bye!');
    })*/

};

await write();