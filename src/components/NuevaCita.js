import React, { Component } from 'react';
import uuid from 'uuid';

const stateincial = {
	cita:{
		mascota:'',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas:''
	},
	error : false
}

class NuevaCita extends Component {
	state = { ...stateincial }
	
	//Cuando el usuario escribe en los inputs
	handleChange = (e)=>{
		e.preventDefault();
		// Colocar lo que el usuario escribe en el estate
		this.setState({
			cita:{
				...this.state.cita,
				[e.target.name]: e.target.value
			}
		})
	}
	//Cuando el usuario envia el formulario
	handleSubmit = (e) => {
		e.preventDefault();

		//Extraer los valores del state
		const {mascota, propietario, fecha, hora, sintomas} = this.state.cita;

		//Validar que todos los campos esten llenos
		if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === ''){
			this.setState({
				error: true
			});
			// detener la ejecucion con un return
			return;
		}

		// Generar objeto con los datos 
		const nuevaCita = {...this.state.cita};
		nuevaCita.id = uuid();

		//Agregar la cita al state de App
		this.props.crearNuevaCita(nuevaCita);

		//Colocar el state al state inicial
		this.setState({
			...stateincial
		})
	}
	render() { 

		//extraer valor del state
		const {error} = this.state;

		return ( 
			<div className="card mt-5 py-5">
				<div className="card-body">
					<h2 className="card-title text-center mb-5">
						Llena el formulario para crear una nueva cita
					</h2>
					{error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos lo campos son obligatorios</div> : null}
					<form onSubmit={this.handleSubmit}>
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">Nombre mascota</label>
							<div className="col-sm-8 col-lg-10">
								<input 
									type="text" 
									className="form-control" 
									placeholder ="Nombre mascota" 
									name="mascota"
									onChange={this.handleChange}
									value={this.state.cita.mascota}	
								/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">Nombre dueño</label>
							<div className="col-sm-8 col-lg-10">
								<input 
									type="text" 
									className="form-control" 
									placeholder ="Nombre dueño mascota" 
									name="propietario"
									onChange={this.handleChange}
									value={this.state.cita.propietario}	
								/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
							<div className="col-sm-8 col-lg-4">
								<input 
									type="date" 
									className="form-control" 
									placeholder ="Nombre dueño" 
									name="fecha"
									onChange={this.handleChange}
									value={this.state.cita.fecha}	
								/>
							</div>

							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">Hora</label>
							<div className="col-sm-8 col-lg-4">
								<input 
									type="time" 
									className="form-control" 
									placeholder ="Nombre dueño" 
									name="hora"
									onChange={this.handleChange}
									value={this.state.cita.hora}	
								/>
							</div>
						</div>

						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
							<div className="col-sm-8 col-lg-10">
							<textarea 
								name="sintomas" 
								className="form-control" 
								placeholder="Describe los sintomas"
								onChange={this.handleChange}
									value={this.state.cita.sintomas}	
							></textarea>
							</div>
						</div>
						<input type="submit" className="py-3 mt-2 btn btn-success" value="Nueva Cita"/>
					</form>
				</div>
			</div>
		 );
	}
}
 
export default NuevaCita;