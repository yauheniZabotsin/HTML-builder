const path = require('path');
const fs = require('fs');
const pathToFile = path.join(__dirname, 'text.txt')

const stream = fs.createReadStream(pathToFile, 'utf-8');

stream.on('data', chunk => console.log(chunk));
stream.on('end', () => console.log('End'));
stream.on('error', error => console.log('Error', error.message));