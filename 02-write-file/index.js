const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const pathToFile = path.join(__dirname, 'text.txt');


rl.question("Hello! Write any text \n", Write);
process.on('exit', () => console.log('Good luck learning Node.js!'))

function Write (text) {
  if (text === 'exit') {
    process.exit();    
  }
  fs.appendFile(path.join(pathToFile), text +'\n', (err) => {
    if (err) throw err
  })
  rl.question('next text\n', Write);
}

rl.on('SIGINT', () => {
  console.log('exit')
  rl.close()
})