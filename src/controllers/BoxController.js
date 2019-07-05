const Box = require('../models/Box');
const User = require('../models/User');
const CryptoJS = require('crypto-js');

const publicKey =
    `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvslv8UjnU9T3RG6WwJOTJ0EdS
        AFxMIT6N/eJ704Mh0CkksAD2hdspEJ5Qq07b6DPQcpI5zK1DQqC50vZMnP/hTZlU
        GbNxoF5JXgZn13ziUq9eL1ACayLBOiywmogG/Icg78vOqmDvaURClMXjARsjHX4X
        9rWUTwhBguBzL12BMQIDAQAB
        -----END PUBLIC KEY-----`;

class BoxController{
   async store(req,res) {
    const user = await User.findById(req.body.user);
       var data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(req.body.boxNew.toString(),  user.privateKey)));
        const box = await Box.create(data[0]);
        return res.json(box);
    }

    async show(req,res){
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {sort: { createdAt: -1}},
            user: req.params.id
        });

        return res.json(box);
    }

    async showAll(req, res) {
        const user = await User.findById(req.params.id);     
        const box = await Box.find({user:req.params.id});
        var data = CryptoJS.AES.encrypt(JSON.stringify(box), user.privateKey).toString();
        return res.json(data);
    }
}

module.exports = new BoxController();