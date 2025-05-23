const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname, '/../.data/');


lib.create = (dir, file, data, callback) =>{
    console.log(dir, 'dir', file, 'file',  data, 'data');
    fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
        console.log('fileDescriptor', fileDescriptor);
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err) => {
                console.log(fileDescriptor, 'fileDescriptor after write');
                if(!err){
                    fs.close(fileDescriptor, (err) => {
                        console.log('fileDescriptor after close', fileDescriptor);
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error closing new file');
                        }
                    });
                }else{
                    callback('Error writing to new file');
                }
            });
            }else{
                callback('Could not create new file, it may already exist');
            }
        });
    }


    module.exports = lib;