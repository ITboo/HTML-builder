import { fileURLToPath } from 'url';
import path from 'path';
import { mkdir, readdir, stat, copyFile, unlink } from 'fs';
import { errorMsg } from '../constants/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyFolder() {
    mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, error => {
        if (error) throw new Error;
        console.log('Directory has been successfully created')
    });

    readdir(path.join(__dirname, 'files'), (_, files) => {
        files.forEach(file => {
            stat(path.resolve(__dirname, 'files', file), (_, stats) => {
                if (stats.isFile()) {
                    copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), error => {
                        if (error) throw new Error(errorMsg);
                        console.log(`${file} has been successfully copied`)
                    });
                }
            })
        })
    })
}

stat(path.join(__dirname, 'files-copy'), error => {
    if (!error) {
        readdir(path.join(__dirname, 'files-copy'), (_, files) => {
            files.forEach(file => {
                unlink(path.join(__dirname, 'files-copy', file), error => {
                    if (error) throw new Error;
                    console.log(`${file} updated`)
                })
            })
        })
    }
});
copyFolder()

