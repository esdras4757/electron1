// variables
const electron=require("electron");
const ipc=electron.ipcRenderer
const buttonAddUser=document.querySelector('#btnAgregarCliente')

let listaclientes=JSON.parse(localStorage.getItem('clientes'))
let listaNotas=JSON.parse(localStorage.getItem('notas'))

const buttonAddNota = document.querySelector('#agregar');
const buttonEditarCliente = document.querySelector('#lista');
const buttonEditarCliente2=document.querySelector('#listaCompleta')
const cantidadClientes=document.querySelector('.cantidadClientes')
const ingresos=document.querySelector('#ingresos')
const buscar=document.querySelector('#buscar')
const ulLista=document.querySelector('#lista')
const ulLista2=document.querySelector('#listaCompleta')

// documento listo 

document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    if(!listaclientes){
        listaclientes=[]
        
    }
    if(!listaNotas){
        listaNotas=[]
    }
   

    if(cantidadClientes){
        cantidadClientes.textContent=listaclientes.length
    }

    if(listaclientes.length<=0){
        
        const comp=document.createElement('h4')
        comp.textContent='No hay clientes agregados'
        comp.className="p-5 text-center "
        if (buttonEditarCliente) {
            buttonEditarCliente.appendChild(comp)
        }

        if(buttonEditarCliente2){
            buttonEditarCliente2.appendChild(comp)
            console.log('no hay clientes')
        }

        
    }
    let total=0
    if (ingresos) {
        listaclientes.forEach(element => {
            total += parseFloat(element.inversion)
        });
        ingresos.textContent=`$${total}`;
    }
    

    
    eventListeners();
    ui.mostrarClientes()
})
// eventListeners

function eventListeners(){
    if (buttonAddUser) {
        buttonAddUser.addEventListener('click',agregarCliente)
    }
    
    if (buttonAddNota) {
        buttonAddNota.addEventListener('click',agregarNota )
    }

    if (buttonEditarCliente) {
        buttonEditarCliente.addEventListener('click',editarcliente)
    }
    if (buttonEditarCliente2) {
        buttonEditarCliente2.addEventListener('click',editarcliente)
    }
    if(buscar){
        buscar.addEventListener('input',buscarCliente)
    }
    
}


// clases

class UI{
    constructor(){
    }

    mensajeError(mensaje , tipo){
        
        const nota = document.querySelector('#formularioNota')

        const msjhtml= document.createElement('div');
        msjhtml.classList.add('p-3', 'm-3','text-center','alert')
        msjhtml.textContent=mensaje

        if (tipo=='error') {
            msjhtml.classList.add('alert-danger')
        }
        else{
            msjhtml.classList.add('alert-success')
        }
      
            nota.insertBefore(msjhtml , document.querySelector('#btnota'))
        
        setTimeout(() => {
            msjhtml.remove()
        }, 2000);
        
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

    mostrarClientes(lista=listaclientes){
        
            let listaclientesparcial
        
            if(ulLista){
                listaclientesparcial=listaclientes.slice(-5)
            }

            if (ulLista) {
                listaclientesparcial.reverse().forEach(cliente => {
            
            
                    const clientehtml=document.createElement('li')
                    clientehtml.classList.add('list-unstyled','d-flex')
                    clientehtml.innerHTML=`
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                    <ul id="column" class="d-flex">
                            <li id="nombre">${cliente.nombre}</li> 
                            <li id="apellido">${cliente.apellido} </li> 
                            <li id="numero">${cliente.numero} </li> 
                            <li id="inversion"> $${cliente.inversion} </li> 
                    </ul>
                    <button class="editar btn btn-primary" data-id=${cliente.id}>editar</button>
                    <button class="eliminar btn btn-danger" data-id=${cliente.id}>eliminar</button>
                    `
                    if (ulLista) {
                     ulLista.appendChild(clientehtml)
                    }
                    if (ulLista2) {
                     ulLista2.appendChild(clientehtml)
                    }
                     
                 });
                
            }


            if (ulLista2) {
                limpiarhtml()

                if (lista.length<=0) {
                    
                    const comp=document.createElement('h4')
                    comp.textContent='No hay clientes agregados'
                    comp.className="p-5 text-center "
                    buttonEditarCliente2.appendChild(comp)
                    console.log('no hay clientes')

                    return
                }
                lista.reverse().forEach(cliente => {
            
            
                    const clientehtml=document.createElement('li')
                    clientehtml.classList.add('list-unstyled','d-flex')
                    clientehtml.innerHTML=`
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                    <ul id="column" class="d-flex">
                            <li id="nombre">${cliente.nombre}</li> 
                            <li id="apellido">${cliente.apellido} </li> 
                            <li id="pais">${cliente.pais} </li>
                            <li id="numero">${cliente.numero} </li> 
                            <li id="correo">${cliente.correo} </li> 
                            <li id="inversion"> $${cliente.inversion} </li> 
                            <li id="modalidad">${cliente.modalidad} </li>
                            <li id="forma">${cliente.forma} </li>
                    </ul>
                    <button class="editar btn btn-primary" data-id=${cliente.id}>editar</button>
                    <button class="eliminar btn btn-danger" data-id=${cliente.id}>eliminar</button>
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
            modalidad,
            forma,
            id:Date.now()
        }

        listaclientes.push(objetoCliente)
        localStorage.setItem('clientes',JSON.stringify(listaclientes))

        console.log(listaclientes)
    }

    editar(nombre,apellido,pais,numero,correo,inversion,modalidad,forma,idn){
        const ClientesLocal=JSON.parse(localStorage.getItem('clientes'))

        console.log(ClientesLocal)

        const objetoCliente={
            nombre,
            apellido,
            pais,
            numero,
            correo,
            inversion,
            modalidad,
            forma,
            id:idn
        }

        console.log(objetoCliente)
        
        const clientesLocalFilter=ClientesLocal.filter((cliente) => {
            return cliente.id!=idn
        })

        console.log(clientesLocalFilter)

        clientesLocalFilter.push(objetoCliente)

        console.log(clientesLocalFilter)

        localStorage.setItem('clientes',JSON.stringify(clientesLocalFilter))

    }

    eliminar(id){
        const clientesLocalStorage=JSON.parse(localStorage.getItem('clientes'))
        const FilteerclientesLocalStorage=clientesLocalStorage.filter((cliente) => {
            return cliente.id!=id;
        })

        console.log(FilteerclientesLocalStorage)

        localStorage.setItem('clientes',JSON.stringify(FilteerclientesLocalStorage))
        ipc.send('actpri')
    }
}

class Notas{
    constructor(){

    }
    agregando(notaNueva){
        const objetoNota={
            id: Date.now(),
            notaNueva
        }

        listaNotas.push(objetoNota)
        localStorage.setItem('notas',JSON.stringify(listaNotas))
    }
   
}


export const cliente= new Clientes();
export const ui=new UI()
export const notas = new Notas();
// instancia

// funciones
function agregarCliente(){
    ipc.send('agregarCliente')
}

function agregarNota(){
    ipc.send('agregarNota');
}

function editarcliente(e){
if(e.target.classList.contains('editar')){
    console.log(e.target.dataset.id)
    ipc.send('editarCliente',e.target.dataset.id)
}
if(e.target.classList.contains('eliminar')){
    cliente.eliminar(e.target.dataset.id)
}}

function buscarCliente(e){

    console.log(e.target.value)

    const listaclientesFilter=listaclientes.filter((element)=>{
        return element.nombre.toUpperCase().includes(e.target.value.toUpperCase()) || element.apellido.toUpperCase().includes(e.target.value.toUpperCase())
    })
    
    ui.mostrarClientes(listaclientesFilter.reverse())
}

function limpiarhtml(){
    while(ulLista2.firstChild){
        ulLista2.removeChild(ulLista2.firstChild)
    }
}
