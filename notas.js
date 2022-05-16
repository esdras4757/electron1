import {ui, notas} from "./app.js"

const nota = document.querySelector('#formularioNota');
const notaNueva = document.querySelector('#nota-nueva');

//event LIsteners
document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('cargado');
    eventListeners();
})

function eventListeners(){
    nota.addEventListener('submit', nuevaNota);
    
}

//funciones
function nuevaNota(e){
    e.preventDefault();

    if(notaNueva.value === ""){    
        ui.mensajeError('No se puede guardar una nota vacia' , 'error');
        return
    }

    notas.agregando(notaNueva.value)
    ui.mensajeError('Nota agregada correctamente','success');
    ui.mostrarNotas();
}