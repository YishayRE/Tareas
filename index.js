let colors = require('colors');
//manualmente
//const{ mostrarMenu, pausa } = require ('./Helpers/mensajes');
const{ 
	inquirerMenu, 
	Pausa, 
	leerInput,
	tareasBorrar,
	confirmar,
	checkList
} = require ('./Helpers/inquirer');
const Tareas = require ('./Models/Tareas');
const {guardarDB, leerDB} = require('./Helpers/Archivos');

console.clear();

const main = async() =>{
	let opt = ' ';
	const tareas = new Tareas();
	const tareasDB = leerDB();
	//console.log(tareasDB);//comprobación
	if(tareasDB){
		tareas.tareasGuardadas(tareasDB);
	}
	//await Pausa();//verificar primer paso
	//console.log(tareas.listadoArr);//comprobación
	
	do{
		opt = await inquirerMenu();
		//console.log(opt);//prueba

		switch(opt){
			case '1':
				const desc = await leerInput('Descripción:');
				tareas.crearTarea(desc);
				console.log(desc);
				break;
			case '2':
				tareas.listadoCompleto();
				//console.log(tareas.listadoArr);//mal modo
				break;
			case '3':
				tareas.listarPC(true);
				break;
			case '4':
				tareas.listarPC(false);
				break;
			case '5':
				const ids = await checkList(tareas.listadoArr);
				tareas.tareasC(ids);
				//console.log(ids);
				break;
			case '6':
				const id = await tareasBorrar(tareas.listadoArr);
				if(id !== '0'){
					const ok = await confirmar('¿Seguro que quieres eliminar eso?');
					if(ok){
						tareas.borrarTarea(id);
						console.log('Tarea borrada correctamente'.yellow);
					}
				}
				break;
				
		}

		guardarDB(tareas.listadoArr);

		if(opt !== '0')
			await Pausa();
	}while(opt !== '0');
	/**/
}

main();

//Base de datos no relacional
/*
const tarea = new Tarea('Comprar comida');
const tareas = new Tareas();
tareas._listado[tarea.id] = tarea;
console.log(tareas);
*/