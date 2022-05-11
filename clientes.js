import {cliente,ui} from "./app.js"
const electron=require("electron");
const ipc=electron.ipcRenderer
const formulario=document.querySelector('#form')
const nombre=document.querySelector('#nombre')
const apellido=document.querySelector('#apellido')
const pais=document.querySelector('#pais')
const numero=document.querySelector('#numero')
const correo=document.querySelector('#correo')
const inversion=document.querySelector('#inversion')
const modalidad=document.querySelector('#modalidad')
const forma=document.querySelector('#forma')

// documento listo 

document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    eventListeners();
})
// eventListeners

function eventListeners(){
    formulario.addEventListener('submit',clientenuevo)
}


function clientenuevo(e){
    e.preventDefault();
    if(nombre.value==""|| apellido.value=="" || pais.value==""|| numero.value==""|| correo.value==""|| inversion.value==""|| forma.value==""|| numero.value==""){
        ui.alerta('Todos los campos deben ser llenados','error')
        return
    }

    cliente.agregar(nombre.value,apellido.value,pais.value,numero.value,correo.value,inversion.value,modalidad.value,forma.value)
    ui.alerta('Cliente agregado correctamente','success')
    ui.mostrarClientes()
    ipc.send('actpri')
}

