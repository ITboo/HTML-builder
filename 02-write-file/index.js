import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stdin, stdout, exit } from 'process';
import { errorMsg } from '../constants/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'new.txt');

const write = async () => {
    const writeStream = createWriteStream(filePath);
    stdout.write('Welcome to your new file. Feel free to put anything to it\n');

    stdin.pipe(writeStream);
    stdin.on('data', data => {
        if(!data.toString().trim() === 'exit') {
            stdout.write(`Added to new file: ${data}`);
          }
        if(data.toString().trim() === 'exit') {
            stdout.write('Thank you. Bye!')
            exit()
          }
    })
    stdin.on('error', (error) => {
        throw new Error(errorMsg);
    })

    process.on('SIGINT', () => {
        stdout.write('Thank you. Bye!');
        exit();
    });

};

await write();