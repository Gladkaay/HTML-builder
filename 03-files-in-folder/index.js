const path = require('path');
const fs = require('fs');

fs.promises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
  .then(files => {
      for (let file of files) {
        if (file.isFile()) {
          fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
            console.log(file.name.replace(".", " - ") + " - " + stats.size/1000 + "kb"); 
          })      
        }
      }
  })