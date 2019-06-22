const User = require('../models/User');
const CryptoJS = require('crypto-js');



class LoginController {
    // async store(req, res) {
    //     const login = await Login.create(req.body);
    //     return res.json(login);
    // }

    async show(req, res) {
        const consulta = await User.find({username:req.query.username});
        var email = CryptoJS.SHA256(consulta[0].email).toString(CryptoJS.enc.Base64);
        var emailPass = email + req.query.password;
        var Pass = CryptoJS.SHA256(emailPass).toString(CryptoJS.enc.Base64);

        const login = await User.findOne({ username: req.query.username,
                                            password: Pass });
        return res.json(login);
    }
}

module.exports = new LoginController();