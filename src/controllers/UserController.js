const User = require('../models/User');
const CryptoJS = require('crypto-js');
var crypto = require("crypto");
const storage = require('node-sessionstorage')
const publicKey =
        `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvslv8UjnU9T3RG6WwJOTJ0EdS
        AFxMIT6N/eJ704Mh0CkksAD2hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlU
        GbNxoF5JXgZn13ziUq9eL1ACayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X
        9rWUTwhBguBzL12BMQIDAQAB
        -----END PUBLIC KEY-----`;

class UserController{
   async store(req,res) {
       try{
        // const data = JSON.parse(CryptoJS.AES.decrypt(req.body.data.toString(), publicKey).toString(CryptoJS.enc.Utf8));
        //    const user = await User.create(data);
        //    console.log("data ", data);
        //    console.log("user ", user);
        //    const dataCiphered = CryptoJS.AES.encrypt(JSON.stringify(user[0]), data[0].privateKey);   
        //    return dataCiphered.toString();
           const data = JSON.parse(CryptoJS.AES.decrypt(req.body.data.toString(), storage.getItem('keyPrivate')).toString(CryptoJS.enc.Utf8));
           const user = await User.create(data);
           const dataCiphered = CryptoJS.AES.encrypt(JSON.stringify(user), storage.getItem('keyPrivate'));
           return res.json({data:dataCiphered.toString()});
       } catch (e) {
           console.log(e);
       }
    }

    async show(req,res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    }

    async verifica(req, res) {
        const login = await User.findOne({ username: req.query.username});
        return res.json({login: login == null ? true : false});
    }
}

module.exports = new UserController();