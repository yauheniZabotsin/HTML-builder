const path = require('path');
const fs = require('fs');
const pathToFolder = path.join(__dirname, 'secret-folder')

fs.readdir(pathToFolder, (err, data) => {
  if (err) console.error(err.message);

  data.forEach(element => {    
    fs.stat(path.join(pathToFolder, element), (err, stats) => {
      if (err) console.error(err.message);
      if (stats.isFile) {
        const baseName = path.parse(element).name;
        const baseExt = path.parse(element).ext.replace(".", "");
        const fileSize = stats.size;
        console.log(`${baseName} - ${baseExt} - ${fileSize}b`);
      }
    })
  })
})
