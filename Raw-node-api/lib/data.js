const fs = require("fs");
const path = require("path");

const lib = {};

lib.basedir = path.join(__dirname, "/../.data/");

lib.create = (dir, file, data, callback) => {
  console.log(dir, "dir", file, "file", data, "data");
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      console.log("fileDescriptor", fileDescriptor);
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, (err) => {
          console.log(fileDescriptor, "fileDescriptor after write");
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              console.log("fileDescriptor after close", fileDescriptor);
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

lib.read = (dir, file, callback) =>{
    fs.readFile(lib.basedir + dir + "/" + file + ".json", 'utf8', (err, data) => {
        callback(err, data);
    });
}

lib.update = (dir, file, data, callback) => {
    fs.open(lib.basedir + dir + "/" + file + ".json", 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err){
                            fs.close(fileDescriptor, (err) => {
                                if(!err){
                                    callback(false);
                                } else {
                                    callback('Error closing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            })
        }else {
            console.log('Error updating. File may not exist')
        }
    })
}


lib.delete = (dir, file, callback) => {
    fs.unlink(lib.basedir + dir + "/" + file + ".json", (err) => {
        if (!err) {
            callback(false);
        } else {
            callback("Error deleting file");
        }
    });
};


module.exports = lib;
