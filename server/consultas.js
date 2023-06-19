// import librarys
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
// Connection DB
const pool = new Pool({
    localhost:"localhost",
    user:"postgres",
    password:"689101101024Edu",
    database:"softjobs",
    port:"5432",
    allowExitOnIdle: true
})

// Functions

// Register user
const registerUser = async (usuario) => {
    try {
        const {email, password, rol, lenguage } = usuario
        // Encripante password
        const passwordEncrypted = bcrypt.hashSync(password)
        const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
        const values = [email, passwordEncrypted, rol, lenguage]
        await pool.query(consulta, values)
    } catch (error) {
        console.error(error.message)
    }
}

const obatainUser = async (email) => {
    try {
        const consult = "SELECT * FROM usuarios WHERE email = $1"
        const values = [email]
        const { rows: data } = await pool.query(consult, values)
        return data
    } catch (error) {
        console.log(error.message)
    }
}



// Exports
module.exports = { registerUser, obatainUser }
