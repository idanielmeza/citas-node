const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteControllers');


module.exports = function(){

    //Agrega nuevos pacientes via POST
    router.post('/pacientes', pacienteController.nuevoCliente);

    //Obtiene los registros en la base de datos
    router.get('/pacientes',pacienteController.obtenerPacientes);

    //Obtiene uun paciente en especifico (ID)
    router.get('/pacientes/:id',pacienteController.ObtenerPaciente);

    //Actualizar un registro 
    router.put('/pacientes/:id', pacienteController.actualizarPaciente);

    //Elimina un paciente
    router.delete('/pacientes/:id', pacienteController.eliminarPaciente);

    return router;
}