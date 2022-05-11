// variables
const electron=require("electron");
const ipc=electron.ipcRenderer
const buttonAddUser=document.querySelector('#btnAgregarCliente');
const buttonAddNota = document.querySelector('#agregar');

// documento listo 

document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    eventListeners();
})
// eventListeners

function eventListeners(){
    buttonAddUser.addEventListener('click',agregarCliente)
    buttonAddNota.addEventListener('click',agregarNota )
}

// clases

class UI{
    constructor(){
    }
}

class clientes{

}

// instancia

// funciones
function agregarCliente(){
    ipc.send('agregarCliente')
}

function agregarNota(){
    ipc.send('agregarNota');
}