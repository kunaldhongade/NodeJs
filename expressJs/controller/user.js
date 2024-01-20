const { User } = require("../model/User")

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.replaceUser = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await User.findOneAndReplace({ _id: id }, req.body, { new: true })
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findOneAndDelete(id)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}

