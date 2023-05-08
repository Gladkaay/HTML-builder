const path = require('path');
const fs = require('fs');

const createDist = async () => {
  await fs.promises.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true});
  await fs.promises.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), "");
  await fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true});
  await fs.promises.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));
  makeStyle();
  copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  getData();
}

createDist();

let makeStyle = function() {
  fs.promises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true})
    .then(files => {
      for (let file of files) {
        if (file.isFile() && path.extname(file.name) == ".css") {
          fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8')
              .on('data', chunk => {
                fs.appendFile(
                    path.join(__dirname, 'project-dist', 'style.css'),
                    chunk + "\n",
                    err => {
                      if (err) throw err;
                    }
                );
              });
        }
      }
    });  
}


let copyDir = function(src, dest) {
  fs.promises.readdir(src, {withFileTypes: true})
    .then(files => {
        for (let file of files) {
          if (file.isDirectory()) {
            fs.promises.mkdir(path.join(dest, file.name), {recursive: true});
            copyDir(path.join(src, file.name), path.join(dest, file.name));
          } else {
            fs.promises.copyFile(path.join(src, file.name), path.join(dest, file.name));            
          }
        }
    })  
}

let getData = function() {
  let template = {};
  fs.promises.readdir(path.join(__dirname, 'components'), {withFileTypes: true})
    .then(files => {
      for (let file of files) {
        if (file.isFile() && path.extname(file.name) == ".html") {
          fs.createReadStream(path.join(__dirname, 'components', file.name), 'utf-8')
              .on('data', chunk => {
                template[file.name.slice(0, -5)] = chunk;
                changeTemplate(template);
              });
        }        
      }
    });  

}

let changeTemplate = function(templates) {
  fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8')
  .on('data', chunk => {
    let index = chunk;
    for (var key in templates) {
      regexp = "{{" + key + "}}";
      index = index.replace(regexp, templates[key]);
    }
    fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), index);
  });
}


