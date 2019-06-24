const Box = require('../models/Box');
const File = require('../models/File');
const privateKey = "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=";
const CryptoJS = require('crypto-js');

class FileController{
    async store(req,res) {

    const box = await Box.findById(req.params.id);
    const data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(req.body.file,  privateKey)));
    const file = await File.create({
        title: data.name,
        path: data.path + data.lastModified,
    });
    box.files.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit("file",file);

        // Criar um arquivo
        
        return res.json(file);
       
    }
}

module.exports = new FileController();