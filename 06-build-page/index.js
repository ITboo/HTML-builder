import { fileURLToPath } from 'url';
import path from 'path';
import {
    mkdir,
    readFile,
    readdir,
    writeFile,
    createWriteStream,
    createReadStream,
    stat,
    appendFile,
    unlink,
    copyFile
} from 'fs';
import { errorMsg } from '../constants/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project-dist directory
mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, error => {
    if (error) throw new Error(errorMsg);
    console.log('project-dist folder has been successfully created')
});

// index.html
let templateFile = ''
readFile(path.join(__dirname, 'template.html'), 'utf-8', (error, data) => {
    if (error) throw new Error(errorMsg);
    templateFile = data;
})

readdir(path.join(__dirname, 'components'), (error, files) => {
    if (error) throw new Error(errorMsg);
    let count = files.length
    for (const file of files) {
        let componentFile = ''
        const fileName = path.parse(file).name
        const componentPath = path.join(__dirname, 'components', file)

        readFile(componentPath, (error, data) => {
            if (error) throw new Error(errorMsg);
            else {
                componentFile = data;
                templateFile = templateFile.replace(`\{\{${fileName}\}\}`, componentFile)
                if (--count === 0) {
                    writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateFile, error => {
                        if (error) throw new Error(errorMsg);
                        console.log('index.html has been successfully created')
                    })
                }

            }
        })
    }
})

// style.css
readdir(path.join(__dirname, 'styles'), (_, files) => {
    files.forEach(file => {
        stat(path.resolve(__dirname, 'styles', file), (_, stats) => {
            if (stats.isFile() && path.extname(file) === '.css') {
                createReadStream(path.join(__dirname, 'styles', file), 'utf-8')
                readFile(path.join(__dirname, 'styles', file), 'utf-8', (error, data) => {
                    if (error) throw new Error(errorMsg);
                    appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, error => {
                        if (error) throw new Error(errorMsg);
                        console.log(`${file} has been successfully added to bundle`)
                    })
                })
            }
        })
    })
})

createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

// assets folder

readdir(path.join(__dirname, 'assets'), (error, folders) => {
    if (error) throw new Error(errorMsg);
    folders.forEach(folder => checkDir(folder))
})

function checkDir(folder) {
    stat(path.join(__dirname, 'project-dist', 'assets'), error => {
        if (!error) {
            readdir(path.join(__dirname, 'project-dist', 'assets', folder), (_, files) => {
                files.forEach(file => {
                    unlink(path.join(__dirname, 'project-dist', 'assets', folder, file), error => {
                        if (error) throw new Error(errorMsg);
                        console.log('file remove')
                    })
                })
            })
        }
    });
}

mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, error => {
    if (error) throw new Error(errorMsg);
    console.log('assets folder has been successfully created')
});

readdir(path.join(__dirname, 'assets'), (error, folders) => {
    if (error) throw new Error(errorMsg);
    folders.forEach(folder => copyFolder(folder))
})

function copyFolder(folder) {
    mkdir(path.join(__dirname, 'project-dist', 'assets', folder), { recursive: true }, error => {
        if (error) throw new Error(errorMsg);
        console.log(`${folder} folder has been succesfully created`)
    });

    readdir(path.join(__dirname, 'assets', folder), (_, files) => {
        files.forEach(file => {
            stat(path.resolve(__dirname, 'assets', folder, file), (_, stats) => {
                if (stats.isFile()) {
                    copyFile(path.join(__dirname, 'assets', folder, file), path.join(__dirname, 'project-dist', 'assets', folder, file), error => {
                        if (error) throw new Error(errorMsg);
                        console.log(`${file} has been successfully added to bundle`)
                    });
                }
            })
        })
    })
}