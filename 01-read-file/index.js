require('fs')
  .createReadStream(require('path')
  .join(__dirname, 'text.txt'), 'utf-8')
  .on('data', chunk => console.log(chunk));