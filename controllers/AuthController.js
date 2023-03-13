const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class ToughtController {
    static async login(req, res) {
        res.render('login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email: email }})

        if(!user) {
            req.flash('message', 'Usuário não encontrado')
            res.render('login')
            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Senha inválida')
            res.render('login')
            return
        }

        try {

            req.session.userid = user.id

            req.flash('message', 'Autenticado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            
        } catch (err) {
            console.err
        }
    }

    static async register(req, res) {
        res.render('register')
    }

    static async registerPost(req, res) {
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