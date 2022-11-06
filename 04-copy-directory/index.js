const path = require('path');
const fs = require('fs/promises');

const pathToFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

createCopyFolder(pathToCopyFolder);

async function createCopyFolder(pathToCopyFolder) {

  try {
    await fs.mkdir(pathToCopyFolder, { recursive: true });

    const files = await fs.readdir(pathToFolder);
    const filesInCopy = await fs.readdir(pathToCopyFolder);
    const removedFiles = filesInCopy.filter(fileName => !files.includes(fileName));

    removedFromCopy(removedFiles);
    copyFiles(files, filesInCopy);

  } catch (err) {
    console.log(err);
  }
}

function copyFiles(files, filesInCopy) {
  files.map(async file => {
    const pathToFile = path.join(pathToFolder, file);
    const pathToCopyFile = path.join(pathToCopyFolder, file);
    const inCopyExist = filesInCopy.includes(file);

    if (!inCopyExist) {
      await fs.copyFile(pathToFile, pathToCopyFile);
    } else {
      const file = await fs.readFile(pathToFile);
      const inCopyFile = await fs.readFile(pathToCopyFile);
      const isEqualFiles = file.toString() === inCopyFile.toString();
      if (!isEqualFiles) {
        await fs.copyFile(pathToFile, pathToCopyFile);
      }
    }
  });
}

function removedFromCopy(removedFiles) {
  removedFiles.map(async file => {
    const pathToCopyFile = path.join(pathToCopyFolder, file);
    await fs.rm(pathToCopyFile);
  });
}