const Box = require('../models/Box');
const User = require('../models/User');
const CryptoJS = require('crypto-js');

class BoxController{
   async store(req,res) {
    const user = await User.findById(req.body.user);
       var data = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(req.body.boxNew.toString(),  user.privateKey)));
        const box = await Box.create(data[0]);
        var encripted = {_id: CryptoJS.AES.encrypt(JSON.stringify({_id:box._id}), user.privateKey).toString()};
        return res.json(encripted);
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