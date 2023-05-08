import { readdir, stat } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'process';
import { errorMsg } from '../constants/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, 'secret-folder');

readdir(dirPath, (_, files) => {
    files.forEach((file) => {
        stat(path.resolve(dirPath, file), (_, stats) => {
            if (stats.isFile()) {
                const fileName = path.parse(file).name
                const fileExtension = path.parse(file).ext.slice(1)
                const fileSize = Math.floor(stats.size / 1024);

                stdout.write(`${fileName} - ${fileExtension} - ${fileSize} kb\n`)
            }
        })
    })
    if (!dirPath) {
        throw new Error(errorMsg)
    }
})
