const UserModel = require('../models/user.model');

exports.signUp = async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({
            status: "Success",
            data: {
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail"
        })
    }
}