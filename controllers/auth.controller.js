const UserModel = require('../models/user.model');
const bcrypt = require("bcrypt")

exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        /* Hash Password */
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await UserModel.create({
            username,
            password: hashPassword
        });
        req.session.user = newUser;
        res.status(201).json({
            status: "Success",
            data: {
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found"
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            req.session.user = user;
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(400).json({
                status: "Fail",
                message: "Incorrect username or password"
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "Fail"
        })
    }
}