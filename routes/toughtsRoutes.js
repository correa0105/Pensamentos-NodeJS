const express = require('express')
const router = express.Router()

const ToughtController = require('../controllers/ToughtController')
const { middlewareAuth } = require('../middlewares/middlewares');

router.get('/dashboard', middlewareAuth, ToughtController.dashboard)
router.get('/add', middlewareAuth, ToughtController.createTought)
router.post('/add', middlewareAuth, ToughtController.createToughtPost)
router.get('/edit/:id', middlewareAuth, ToughtController.editTought)
router.post('/edit', middlewareAuth, ToughtController.editToughtPost)
router.post('/remove', middlewareAuth, ToughtController.removeTought)
router.get('/', ToughtController.showToughts)

module.exports = router