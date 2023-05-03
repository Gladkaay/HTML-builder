const path = require('path');
const fs = require('fs');

fs.promises.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
fs.promises.readdir(path.join(__dirname, 'files-copy'))
  .then(filesCopy => {
      for (let fileCopy of filesCopy) {
        fs.unlink(path.join(__dirname, 'files-copy', fileCopy), (err) => {
          if (err) throw err;
        });
      }
  })
fs.promises.readdir(path.join(__dirname, 'files'))
  .then(files => {
      for (let file of files) {
        fs.promises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
      }
  })