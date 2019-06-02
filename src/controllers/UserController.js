const User = require('../models/User');

class UserController{
   async store(req,res) {
    

       const user = await User.create(req.body);
        return res.json(user);
    }

    async show(req,res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    }
}

module.exports = new UserController();