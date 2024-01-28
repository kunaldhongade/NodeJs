const data = require('../data.json')
const users = data.users;

exports.createUser = (req, res) => {
    const user = req.body
    console.log(user)
    users.push(user)
    res.json(user)
}

exports.getAllUsers = (req, res) => {
    res.json(users)
}

exports.getUser = (req, res) => {
    const id = +req.params.id
    const user = users.find(user => user.id === id)
    res.json(user)
}

exports.replaceUser = (req, res) => {
    const id = +req.params.id
    const userIndex = users.findIndex(user => user.id === id)
    users.splice(userIndex, 1, { ...req.body, id })
    res.status(200).json({ 1: "updated" });
}

exports.deleteUser = (req, res) => {
    const id = +req.params.id
    const index = users.findIndex(user => user.id === id)
    const user = users[index]
    users.splice(index, 1)
    res.status(204).json(user)
}

exports.updateUser = (req, res) => {
    const id = +req.params.id
    const userIndex = users.findIndex(user => user.id === id)
    const user = users[userIndex]
    users.splice(userIndex, 1, { ...user, ...req.body })
    res.status(200).json({ 1: "updated" });
}

