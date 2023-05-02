const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'hello.txt'), "", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Вау, все комплименты мира для тебя! Напиши что-нибудь:");
});

const { stdin, stdout } = process;
stdin.on('data', data => {
  if (data.toString().trim() == 'exit') {
    stdout.write('Удачи!'); 
    process.exit();
  }
  fs.appendFile(
    path.join(__dirname, 'hello.txt'),
    data,
    err => {
      if (err) throw err;
    }
  );
});
process.on('SIGINT', () => {
  stdout.write('Пока пока!'); 
  process.exit();
});