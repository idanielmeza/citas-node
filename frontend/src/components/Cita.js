import React, {Fragment, useState} from 'react'
import { Link , withRouter} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = (props) => {
    const [nuevaCita,nuevaCitaState] = useState({
        nombre : '',
        propietario : '',
        fecha : '',
        hora : '',
        telefono : '',
        sintomas: ''
    });

    if(!props.cita){
        props.history.push('/');
        return null;
    }

    const {cita: {_id, nombre, propietario,fecha,hora,telefono,sintomas}} = props;


    const actualizarState = e=>{
        nuevaCitaState({
            ...nuevaCita,[e.target.name]: e.target.value
        })
    }

    //Btn eliminar
    const eliminarCita = id=>{

        Swal.fire({
            title: 'Deseas Eliminar la Cita?',
            text: `Se eliminara la cita de ${nombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado',
                'La cita ha sido eliminada',
                'Eliminado'
            )
            //Eliminando de la base de datos
            clienteAxios.delete(`/pacientes/${id}`)
            .then(r=>{
                
                props.guardarConsultar(true);
                
            })
            .catch(e=>{
                console.log(e)
            })
            props.history.push('/');
            }
          })


    }

    const actualizarCita = id=>{

        if(nuevaCita.nombre === ''){
            nuevaCita.nombre = nombre
        }
        if(nuevaCita.propietario === ''){
            nuevaCita.propietario = propietario
        }
        if(nuevaCita.fecha === ''){
            nuevaCita.fecha = fecha
        }
        if(nuevaCita.hora === ''){
            nuevaCita.hora = hora
        }
        
        if(nuevaCita.telefono === ''){
            nuevaCita.telefono = telefono
        }    
        if(nuevaCita.sintomas === ''){
            nuevaCita.sintomas = sintomas
        }
                
        //Eliminando de la base de datos
        clienteAxios.put(`/pacientes/${id}`,nuevaCita)
        .then(r=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Actualizado Correctamente',
                showConfirmButton: false,
                timer: 1500
              })
            props.guardarConsultar(true);
        })
        .catch(e=>{
            console.log(e)
        })
        props.history.push('/');


        
    }

    return ( 
        <Fragment>
            <h1 className='my-5'>Informacion sobre la cita de : {nombre}</h1>
            <div className='container mt-5 py-5'>
                <div className='row'>
                    <div className='col-12 mb-5 d-flex justify-content-center'>
                        <Link to={'/'} className='btn btn-success text-uppercase py-2 font-weight-bold'>Volver</Link>
                    </div>

                    <div className='col-md-8 mx-auto'>
                        <div className='list-group'>
                            <div className='p-5 list-group list-group-item list-group-item-action flex-column align-items-center'>
                                <div className='d-flex w-100 justify-content-center mb-4'>
                                    <h3  className='mb-3 text-center'>{nombre}</h3>
                                </div>
                                

                                <form 
                                    className="bg-white p-5 bordered">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre Mascota</label>
                                            <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                id="nombre" 
                                                name="nombre" 
                                                placeholder="Nombre Mascota" 
                                                defaultValue={nombre}
                                                onChange={actualizarState}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="propietario">Nombre Propietario</label>
                                            <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                id="propietario" 
                                                name="propietario" 
                                                placeholder="Nombre Propietario" 
                                                defaultValue={propietario}
                                                onChange={actualizarState}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="telefono">Teléfono</label>
                                            <input 
                                                type="tel" 
                                                className="form-control form-control-lg" 
                                                id="telefono" 
                                                name="telefono" 
                                                placeholder="Teléfono" 
                                                defaultValue={telefono}
                                                onChange={actualizarState}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="fecha">Fecha Alta</label>
                                            <input 
                                                type="date" 
                                                className="form-control form-control-lg" 
                                                id="fecha" 
                                                name="fecha"
                                                defaultValue={fecha}
                                                onChange={actualizarState}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="hora">Hora Alta</label>
                                            <input 
                                                type="time" 
                                                className="form-control form-control-lg" 
                                                id="hora" 
                                                name="hora"  
                                                defaultValue={hora}
                                                onChange={actualizarState}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="sintomas">Síntomas</label>
                                            <textarea 
                                                className="form-control" 
                                                name="sintomas" 
                                                rows="6"
                                                onChange={actualizarState}
                                            >{sintomas}</textarea>
                                        </div>
                                    </form>

                                <div className='d-grid grid-column'>
                                    <button type='button' className='text-uppercase py-2 px-5 font-weight-bold btn btn-primary col mb-3' onClick={()=>actualizarCita(_id)}>
                                        Guardar Cambios
                                    </button>
                                    <button type='button' className='text-uppercase py-2 px-5 font-weight-bold btn btn-danger col' onClick={()=>eliminarCita(_id)}>
                                        Eliminar &times;
                                    </button>
                                </div>                                 

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
     );
}
 
export default withRouter(Cita);