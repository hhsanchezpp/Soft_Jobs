
const router = require('express').Router()
const { reportarConsultaMiddleWare, validacionesNuevoUsuario, validacionesVerificarUsuario } = require('../middlewares/index')
const { nuevoUsuarioController, verificarCredencialesController, getUsuarioTokenController } = require('../controllers/index')

router.post('/usuarios', validacionesNuevoUsuario, reportarConsultaMiddleWare, nuevoUsuarioController)
router.post('/login', reportarConsultaMiddleWare, validacionesVerificarUsuario, verificarCredencialesController)
router.get('/usuarios',reportarConsultaMiddleWare, getUsuarioTokenController )

//mensaje si no hay coincidencias de los router ant
router.get("*", (req, res) => {
    res.status(404).send("La ruta no existe")
})

module.exports = router
