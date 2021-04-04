const Tarea = require ('./Tarea');
const colors = require ('colors');

class Tareas{
	_listado = {};

	get listadoArr(){
		const listado = [];
		Object.keys(this._listado).forEach( key =>{
				const tarea = this._listado[key];
				listado.push(tarea);
			}
		);

		return listado;
	}

	constructor(){
		this._listado = {};
	}

	borrarTarea( id = '' ){
		if(this._listado[id]){
			delete this._listado[id];
		}
	}

	tareasGuardadas(tareas = []){
		tareas.forEach( tarea =>{
				this._listado[tarea.id] = tarea;
			}
		);
		//Mi formaa
		/*
		let i = 0;

		do{
			let tarea = new Tarea(tareas[i].desc);
			tarea.id = tareas[i].id;
			this._listado[tarea.id] = tarea;
			i++;
		}while(tareas[i]);
		*/
	}

	crearTarea(desc = ''){
		const tarea = new Tarea(desc);

		this._listado[tarea.id] = tarea;
	}

	listadoCompleto(desc = ''){
		console.log();
		this.listadoArr.forEach((tarea, i) =>{
				const idx = `${i + 1}`.green;
				const {desc, completadoEn} = tarea;
				const estado = ( completadoEn )
					?'Completada'.green
					:'Pendiente'.red;
				console.log(`${idx}${'.'.green} ${desc} :: ${estado}`);
			}
		);
		console.log();
		//Mi forma
		/*
		Object.keys(this._listado).forEach( (key, i) =>{
				let tarea = `${colors.green(i + 1)}${'.'.green} ${this._listado[key].desc} :: `;
				if(this._listado[key].completadoEn)
					tarea += `${'Completada'.green}`;
				else
					tarea += `${'Pendiente'.red}`;
				console.log(tarea);
				i++;
			}
		);
		*/
	}

	listarPC( completadas = true ){
		let i = 1;
		console.log();
		this.listadoArr.forEach((tarea) =>{	
				const idx = `${i}`.green;
				const {desc, completadoEn} = tarea;
				if(completadas){
					if(completadoEn){
						console.log(`${idx}${'.'.green} ${desc} :: ${completadoEn.green}`);
						i++;
					}
				}
				else{
					if(!completadoEn){
						const estado = 'Pendiente'.red;
						console.log(`${idx}${'.'.green} ${desc} :: ${estado}`);
						i++;
					}
				}

			}
		);
		console.log();
	}

	tareasC(ids = []){
		ids.forEach( id =>{
				const tarea = this._listado[id];
				if(!tarea.completadoEn){
					tarea.completadoEn = new Date().toISOString()
				}
			}
		);

		this.listadoArr.forEach( tarea =>{
				if(!ids.includes(tarea.id)){
					this._listado[tarea.id].completadoEn = null;
				}
			}
		);
	}
}

module.exports = Tareas;