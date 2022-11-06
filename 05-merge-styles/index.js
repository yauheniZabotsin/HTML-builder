const path = require('path');
const fs = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');

const pathToFiles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist/bundle.css');
const writeStream = createWriteStream(pathToBundle, { withFileTypes: true });

readFiles(pathToFiles)

async function readFiles(folder) {
  try {
    const files = await fs.readdir(folder, { withFileTypes: true });
    filesPack(files);
  } catch (error) {
    console.log(error.message);
  }
}

async function filesPack(files) {
  let isFiles = false;

  files.forEach( (file) => {
    const fileName = file.name;
    const isCssType = fileName.match(/\.(css)$/);
    if (file.isFile() && isCssType) {
      isFiles = true;
      const pathToFile = path.join(__dirname, `styles/${file.name}`);
      const readStream = createReadStream(pathToFile);
      readStream.on('data', (data) => {
        writeStream.write(data);
      });
    }
  })
  if (!isFiles) {
    await fs.rm(pathToBundle);
  }
}