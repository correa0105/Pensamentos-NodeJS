const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', 'uSN@2101', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log("Conectado com sucesso!")
} catch(err) {
    console.log("Não foi possivel conectarse ao banco de dados...", + err)
}

module.exports = sequelize