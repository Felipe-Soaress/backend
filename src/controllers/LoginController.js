const User = require('../models/User');

class LoginController {
    // async store(req, res) {
    //     const login = await Login.create(req.body);
    //     return res.json(login);
    // }

    async show(req, res) {
        console.log(req.query);
        const login = await User.findOne({ username: req.query.username,
                                            password: req.query.password });
        console.log(login)
        return res.json(login);
    }
}

module.exports = new LoginController();