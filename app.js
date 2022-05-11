// variables
const electron=require("electron");
const ipc=electron.ipcRenderer
const buttonAddUser=document.querySelector('#btnAgregarCliente')
let listaclientes=JSON.parse(localStorage.getItem('clientes'))
// documento listo 

document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    if(!listaclientes){
        listaclientes=[]
    }
    eventListeners();
    ui.mostrarClientes()
})
// eventListeners

function eventListeners(){
    if (buttonAddUser) {
        buttonAddUser.addEventListener('click',agregarCliente)
    }
    
}


// clases

class UI{
    constructor(){
    }

    alerta(mensaje,tipo){
        const formulario=document.querySelector('#form')

        const mensajehtml= document.createElement('div');
        mensajehtml.classList.add('p-3','text-center','alert')
        mensajehtml.textContent=mensaje

        if (tipo=='error') {
            mensajehtml.classList.add('alert-danger')
        }
        else{
            mensajehtml.classList.add('alert-success')
        }

        formulario.insertBefore(mensajehtml,document.querySelector('#btnform'))

        setTimeout(() => {
            mensajehtml.remove()
        }, 2000);
        
    }

    mostrarClientes(){
        const ulLista=document.querySelector('#lista')
            const ulLista2=document.querySelector('#listaCompleta')
            let listaclientesparcial
        
            if(ulLista){
                listaclientesparcial=listaclientes.slice(-5)
            }
            if(ulLista2){
                listaclientesparcial=listaclientes.slice(0,10)
            }
            listaclientesparcial.reverse().forEach(cliente => {
            
            
           const clientehtml=document.createElement('li')
           clientehtml.classList.add('list-unstyled','d-flex')
           clientehtml.innerHTML=`
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
           <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
         </svg>
           <ul id="column" class="d-flex">
                   <li class=""> <p>${cliente.nombre}</p></li> 
                   <li class="">${cliente.apellido} </li> 
                   <li class="">${cliente.pais} </li> 
                   <li class="">${cliente.numero} </li> 
                   <li class="">${cliente.correo} </li> 
                   <li class=""> ${cliente.inversion} </li> 
                   <li class=""> ${cliente.modalidad} </li> 
           </ul>
           <button class="btn btn-primary">editar</button>
           <button class="btn btn-danger">eliminar</button>
           `
           if (ulLista) {
            ulLista.appendChild(clientehtml)
           }
           if (ulLista2) {
            ulLista2.appendChild(clientehtml)
           }
            
        });
    }
}

class Clientes{
    constructor(){

        

    }

    agregar(nombre,apellido,pais, numero,correo, inversion,modalidad, forma){
        const objetoCliente={
            nombre,
            apellido,
            pais,
            numero,
            correo,
            inversion,
            modalidad,forma
        }

        listaclientes.push(objetoCliente)
        localStorage.setItem('clientes',JSON.stringify(listaclientes))
    }
}


export const cliente= new Clientes();
export const ui=new UI()
// instancia

// funciones
function agregarCliente(){
    ipc.send('agregarCliente')
}
