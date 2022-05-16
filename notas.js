//variables
//const electron=require("electron");
//const ipc=electron.ipcRenderer
const nota = document.querySelector('#nota-nueva');
const guardarNota = document.querySelector('#btnota');

//event LIsteners
document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    eventListeners();
})

function eventListeners(){
    guardarNota.addEventListener('submit', nuevaNota);
}

//funciones
function nuevaNota(e){
    e.preventDefault();
    console.log('guardando')
}