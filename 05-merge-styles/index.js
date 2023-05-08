import { fileURLToPath } from 'url';
import path from 'path';
import {
    readdir,
    stat,
    createReadStream,
    readFile,
    appendFile,
    createWriteStream } from 'fs';
import { errorMsg } from '../constants/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

readdir(path.join(__dirname, 'styles'), (_, files) => {
    files.forEach(file => {
        stat(path.resolve(__dirname, 'styles', file), (_, stats) => {
            if (stats.isFile() && path.extname(file) === '.css') {
                createReadStream(path.join(__dirname, 'styles', file), 'utf-8')
                readFile(path.join(__dirname, 'styles', file), 'utf-8', (error, data) => {
                    if (error) throw new Error (errorMsg);
                    appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, error => {
                        if (error) throw new Error(errorMsg);
                        console.log('File has been added to bundle')
                    })
                })
            }

            createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
        })
    })
})