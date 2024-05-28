const pool = require('../dataBase/index')
const format = require('pg-format')
const bcrypt = require('bcryptjs')

const getQuery = async () => {
    try {
        const consulta = "SELECT * FROM usuarios"
        const result = await pool.query(consulta)
        return result
    } catch (error) {
        throw {
            message: "Error al ejecutar la consul... sql",
            originalError: error.message,
        };
    }

}

/* nuevo usuariomregistro */
const registrarUsuarioQuery = async (email, password, rol, lenguage) => {

    try {
        const encryptPassword = bcrypt.hashSync(password)
        password = encryptPassword
        const values = [email, password, rol, lenguage]
        const consulta = format(`INSERT INTO usuarios (email,password,rol,lenguage) 
                                 VALUES(%L, %L, %L, %L) RETURNING *`, ...values
        );
        const result = await pool.query(consulta)
        return result.rows

    } catch (error) {
        if (error.code === '23505' && error.constraint === 'usuarios_email_key') {
            throw new Error('Mail está registrado. Ingresa otro.');
        }
        console.error(`Error al en registrarUsuarioQuery:`, error.message)
        throw new Error(`Error en el servidor. Trata más tarde`)
    }
}

/* Chequear credencial */
const verificarCredencialesQuery = async (email) => {
    try {
        const values = [email]
        const consulta = format("SELECT * FROM usuarios WHERE email = %L", ...values)
        const {rows:[usuario] } = await pool.query(consulta)
        return usuario
    } catch (error) {
        console.error(`Error al en verificar Credenciales:`, error.message)
        throw new Error(`Error en el servidor. Trata tarde`)
    }
}
module.exports = {
    getQuery,
    registrarUsuarioQuery,
    verificarCredencialesQuery
}