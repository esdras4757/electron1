// variables
const electron=require("electron");
const ipc=electron.ipcRenderer
const buttonAddUser=document.querySelector('#btnAgregarCliente')

// documento listo 

document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    eventListeners();
})
// eventListeners

function eventListeners(){
    buttonAddUser.addEventListener('click',agregarCliente)
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