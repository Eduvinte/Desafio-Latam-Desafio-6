// Imports
const express = require('express')


const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')


const { registerUser, obatainUser, validatedUser } = require('./consultas')

// Server
app.listen(3000, console.log("¡Server starter success!"))

// Middleware
app.use(express.json())
app.use(cors())

// Routes

// Register user
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = req.body
        await registerUser(usuario)
        res.send('Usuario registrado con éxito')
    } catch (error) {
        console.error(error.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const validation = await validatedUser(email, password)
        if (!validation) {
           return res.status(401).json({ error: 'Email o contraseña equivocadas' })
        }
            const token = jwt.sign({ email }, "az_AZ")
            res.json(token)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Ocurrió un error en el servidor' })
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        const Authorization = req.header("Authorization")
        if (!Authorization) {

            return res.status(401).json({ error: 'Token de autorización no proporcionado' })
        }

        try {
            const token = Authorization.split("Bearer ")[1]
            jwt.verify(token, "az_AZ")
            const { email } = jwt.decode(token)
            const data = await obatainUser(email)
            res.json(data)
        } catch (error) {
            console.error(error.message)
            res.status(401).json({ error: 'Token de autorización inválido' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Ocurrió un error en el servidor' })
    }
})
