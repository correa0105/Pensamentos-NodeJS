const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res) {
        res.render('home')
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({ where: { id: userId }, include: Tought, plain: true })

        if(!user) {
            res.redirect('/login')
        }

        const toughts = user.Toughts.map(result => result.dataValues)

        let emptyToughts = false

        if(toughts.length === 0) {
            emptyToughts = true
        }

        res.render('dashboard', { toughts, emptyToughts })
    }

    static async createTought(req, res) {
        res.render('createTought')
    }

    static async createToughtPost(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        
       try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
       } catch (err) {
            console.log(err)
       }
    }

    static async removeTought(req, res) {
        const toughtId = req.body.id
        const UserId = req.session.userid

        try {
            await Tought.destroy({ where: { id: toughtId, UserId: UserId } })

            req.flash('message', 'Pensamento removido com sucesso!')
            
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log(err)            
        }
    }
}