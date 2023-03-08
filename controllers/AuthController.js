const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class ToughtController {
    static async login(req, res) {
        res.render('login', { session: req.session.userid })
    }

    static async register(req, res) {
        res.render('register', { session: req.session.userid })
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

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {

            const creatdeUser = await User.create(user)

            req.session.userid = creatdeUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

        } catch(err) {
            console.log(err)
        }
    }

    static async logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}