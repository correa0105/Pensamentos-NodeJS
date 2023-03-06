const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class ToughtController {
    static async login(req, res) {
        res.render('login')
    }

    static async register(req, res) {
        res.render('register')
    }

    static async registerSave(req, res) {
        const { name, email, password, confirmpassword } = req.body

        if(password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('register')
            return
        }

        const checkIfUserExists = await User.findOne({ where: {email: email}})

        if(checkIfUserExists) {
            req.flash('message', 'O email já foi cadastrado!')
            res.render('register')
            return
        }
    }
}