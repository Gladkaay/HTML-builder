const path = require('path');
const fs = require('fs');


fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    "",
    err => { 
      if (err) throw err;
    }
);

fs.promises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
    .then(files => {
      for (let file of files) {
        if (file.isFile() && path.extname(file.name) == ".css") {
          fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8')
              .on('data', chunk => {
                fs.appendFile(
                    path.join(__dirname, 'project-dist', 'bundle.css'),
                    chunk + "\n",
                    err => {
                      if (err) throw err;
                    }
                );
              });
        }
      }
    });
