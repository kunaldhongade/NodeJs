const express = require('express')
const userRouter = express.Router()

const userController = require('../controller/user')

userRouter.post('/', userController.createUser)
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUser)
    .put('/:id', userController.replaceUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

module.exports = userRouter