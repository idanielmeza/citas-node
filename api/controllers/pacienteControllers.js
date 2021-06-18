const Paciente = require('../models/Paciente');

//Cuando se crea un nuevo cliente
exports.nuevoCliente = async(req,res,next)=>{
    //TODO : Insertar en la base de datos
    
    //Crear objeto de paciente con datos de req.body

    const paciente = new Paciente(req.body);
    
    try {
        await paciente.save();
        res.json({mensaje: 'El cliente se agrego correctamente.'});
    } catch (error) {
        console.log(error);
        next();
    }

}

//Obtiene todos los pacientes
exports.obtenerPacientes = async(req,res,next)=>{

    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
        
    } catch (error) {
        console.log(error);
        next();
    }

}

//Obtiene un pacientepor su id
exports.ObtenerPaciente = async(req,res,next)=>{
    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualiza un registro
 exports.actualizarPaciente = async(req,res,next)=>{

    try {
        const paciente = await Paciente.findOneAndUpdate({_id: req.params.id}, req.body,{
            new: true
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }

 }

 //Eliminar un paciente
 exports.eliminarPaciente = async(req,res,next)=>{
     try {
         await Paciente.findByIdAndDelete({_id: req.params.id});
         res.json({mensaje:'El paciente fue eliminado'});
         
     } catch (error) {
         console.log(error);
         next();
     }
 }