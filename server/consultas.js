// import librarys
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
// Connection DB
const pool = new Pool({
    localhost: "localhost",
    user: "postgres",
    password: "689101101024Edu",
    database: "softjobs",
    port: "5432",
    allowExitOnIdle: true
})

// Functions

// Register user
const registerUser = async (usuario) => {
    try {
        const { email, password, rol, lenguage } = usuario
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

const validatedUser = async (email, password) => {
    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1"
        const values = [email]
        const result = await pool.query(consulta, values)

        if(result.rows.length === 0){
            return false
        }

        const user = (result.rows[0])
        const passwordEncryptado = await bcrypt.compare(password, user.password)
        if(passwordEncryptado){
            return true
        }else{
            throw new Error('Contraseña incorrecta')
        }       
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        throw error; // Puedes lanzar la excepción para que se maneje en otro lugar si es necesario

    }
}



// Exports
module.exports = { registerUser, obatainUser, validatedUser }
