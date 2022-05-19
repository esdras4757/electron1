// variables
const electron = require("electron");
const ipc = electron.ipcRenderer
const buttonAddUser = document.querySelector('#btnAgregarCliente')

let listaclientes = JSON.parse(localStorage.getItem('clientes'))
let listaNotas = JSON.parse(localStorage.getItem('notas'))

const BtnEditarNotas = document.querySelector('#listadoNotas')
const BtnEditarNotas2 = document.querySelector('#ListaNotas')
const cantidadNotas = document.querySelector('#notareciente')
const listadoNotas = document.querySelector('#listadoNotas')
const listadoNotas2 = document.querySelector('#ListaNotas')
const buttonAddNota = document.querySelector('#agregar');
const buttonEditarCliente = document.querySelector('#lista');
const buttonEditarCliente2 = document.querySelector('#listaCompleta')
const cantidadClientes = document.querySelector('.cantidadClientes')
const ingresos = document.querySelector('#ingresos')
const buscar = document.querySelector('#buscar')
const ulLista = document.querySelector('#lista')
const ulLista2 = document.querySelector('#listaCompleta')
const buscador = document.querySelector('#buscador')

// documento listo 

document.addEventListener('DOMContentLoaded', () => {

    console.log('listooo');
    if (!listaclientes) {
        listaclientes = []

    }
    if (!listaNotas) {
        listaNotas = []
    }


    if (cantidadClientes) {
        cantidadClientes.textContent = listaclientes.length
    }

    if (listaclientes.length <= 0) {

        const comp = document.createElement('h4')
        comp.textContent = 'No hay clientes agregados'
        comp.className = "p-5 text-center "
        if (buttonEditarCliente) {
            buttonEditarCliente.appendChild(comp)
        }

        if (buttonEditarCliente2) {
            buttonEditarCliente2.appendChild(comp)
            console.log('no hay clientes')
        }


    }

    if (cantidadNotas) {
        cantidadNotas.textContent = listaNotas.length;
    }

    if (listaNotas.length <= 0) {

        const nohay = document.createElement('h4');
        nohay.textContent = 'No hay notas agregadas';
        nohay.className = "p-5 text-center ";

        if (BtnEditarNotas) {
            BtnEditarNotas.appendChild(nohay)
        }

        if (BtnEditarNotas2) {
            BtnEditarNotas2.appendChild(nohay)
            console.log('no hay notas')
        }


    }
    let total = 0
    if (ingresos) {
        listaclientes.forEach(element => {
            total += parseFloat(element.inversion)
        });
        ingresos.textContent = `$${total}`;
    }



    eventListeners();
    ui.mostrarClientes()
    ui.mostrarnotas();
})
// eventListeners

function eventListeners() {
    if (buttonAddUser) {
        buttonAddUser.addEventListener('click', agregarCliente)
    }

    if (buttonAddNota) {
        buttonAddNota.addEventListener('click', agregarNota)
    }

    if (buttonEditarCliente) {
        buttonEditarCliente.addEventListener('click', editarcliente)
    }
    if (buttonEditarCliente2) {
        buttonEditarCliente2.addEventListener('click', editarcliente)
    }
    if (buscar) {
        buscar.addEventListener('input', buscarCliente)
    }

    if(BtnEditarNotas){
        BtnEditarNotas.addEventListener('click' , eliminarNota);
    }

    if(BtnEditarNotas2){
        BtnEditarNotas2.addEventListener('click' , eliminarNota);
    }

    if(buscador){
        buscador.addEventListener('keyup' , buscarNotas);
    }


}


// clases

class UI {
    constructor() {
    }

    mensajeError(mensaje, tipo) {

        const notilla = document.querySelector('#formularioNota')

        const msjhtml = document.createElement('div');
        msjhtml.classList.add('p-3', 'm-3', 'text-center', 'alert')
        msjhtml.textContent = mensaje

        if (tipo == 'error') {
            msjhtml.classList.add('alert-danger')
        }
        else {
            msjhtml.classList.add('alert-success')
        }

        notilla.insertBefore(msjhtml, document.querySelector('#btnota'))

        setTimeout(() => {
            msjhtml.remove()
        }, 2000);

    }

    alerta(mensaje, tipo) {
        const formulario = document.querySelector('#form')

        const mensajehtml = document.createElement('div');
        mensajehtml.classList.add('p-3', 'text-center', 'alert')
        mensajehtml.textContent = mensaje

        if (tipo == 'error') {
            mensajehtml.classList.add('alert-danger')
        }
        else {
            mensajehtml.classList.add('alert-success')
        }

        formulario.insertBefore(mensajehtml, document.querySelector('#btnform'))

        setTimeout(() => {
            mensajehtml.remove()
        }, 2000);

    }

    mostrarClientes(lista = listaclientes) {

        let listaclientesparcial

        if (ulLista) {
            listaclientesparcial = listaclientes.slice(-5)
        }

        if (ulLista) {
            listaclientesparcial.reverse().forEach(cliente => {


                const clientehtml = document.createElement('li')
                clientehtml.classList.add('list-unstyled', 'd-flex')
                clientehtml.innerHTML = `
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

            if (lista.length <= 0) {

                const comp = document.createElement('h4')
                comp.textContent = 'No hay clientes agregados'
                comp.className = "p-5 text-center "
                buttonEditarCliente2.appendChild(comp)
                console.log('no hay clientes')

                return
            }
            lista.reverse().forEach(cliente => {


                const clientehtml = document.createElement('li')
                clientehtml.classList.add('list-unstyled', 'd-flex')
                clientehtml.innerHTML = `
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
    mostrarnotas(lista = listaNotas) {

        let listanotasparcial
           
        if (listadoNotas) {
            listanotasparcial = listaNotas.slice(-6)
        }

        if (listadoNotas) {
            listanotasparcial.reverse().forEach(nota => {


                const notahtml = document.createElement('li')
                notahtml.classList.add( 'd-inline-block' , 'list-unstyled' , 'm-3')
                notahtml.innerHTML = `
                <div >
                    <div>
                        <div class="card border-warning rounded ">
                             <div class="card-body">
                                <h5 class="card-title "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sticky" viewBox="0 0 16 16">
                                <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z"/>
                              </svg></h5>
                                    <p class="card-text ">${nota.notaNueva}</p>
                                    <button class="editar btn btn-success m-1  " data-id=${nota.id}>Editar</button>
                                    <button class="eliminar btn btn-danger  m-1" data-id=${nota.id}>Eliminar</button>
                            </div>
                         </div>
                </div>
                             `
                if (listadoNotas) {
                    listadoNotas.appendChild(notahtml)
                }
                if (listadoNotas2) {
                    listadoNotas2.appendChild(notahtml)
                }

            });

        }


        if (listadoNotas2) {
           limpiarHTML();

            if (lista.length <= 0) {

                const nohay = document.createElement('h4');
                nohay.textContent = 'No hay notas agregadas';
                nohay.className = "p-5 text-center ";
                BtnEditarNotas2.appendChild(nohay);
                console.log('no hay notas');

                return
            }
            lista.reverse().forEach(nota => {

                
                const notahtml = document.createElement('li')
                notahtml.classList.add( 'd-inline-block' , 'list-unstyled' , 'm-3')
                notahtml.innerHTML = `
                <div >
                    <div>
                        <div class="card border-warning rounded">
                             <div class="card-body">
                                <h5 class="card-title "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sticky" viewBox="0 0 16 16">
                                <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z"/>
                              </svg></h5>
                                    <p class="card-text">${nota.notaNueva}</p>
                                    <button class="editar btn btn-success m-1  " data-id=${nota.id}>Editar</button>
                                    <button class="eliminar btn btn-danger  m-1" data-id=${nota.id}>Eliminar</button>
                            </div>
                         </div>
                </div>
            
                             `
                if (listadoNotas) {
                    listadoNotas.appendChild(notahtml)
                }
                if (listadoNotas2) {
                    listadoNotas2.appendChild(notahtml)
                }

            });

        }

    }
}

class Clientes {
    constructor() {
    }

    agregar(nombre, apellido, pais, numero, correo, inversion, modalidad, forma) {
        const objetoCliente = {
            nombre,
            apellido,
            pais,
            numero,
            correo,
            inversion,
            modalidad,
            forma,
            id: Date.now()
        }

        listaclientes.push(objetoCliente)
        localStorage.setItem('clientes', JSON.stringify(listaclientes))

        console.log(listaclientes)
    }

    editar(nombre, apellido, pais, numero, correo, inversion, modalidad, forma, idn) {
        const ClientesLocal = JSON.parse(localStorage.getItem('clientes'))

        console.log(ClientesLocal)

        const objetoCliente = {
            nombre,
            apellido,
            pais,
            numero,
            correo,
            inversion,
            modalidad,
            forma,
            id: idn
        }

        console.log(objetoCliente)

        const clientesLocalFilter = ClientesLocal.filter((cliente) => {
            return cliente.id != idn
        })

        console.log(clientesLocalFilter)

        clientesLocalFilter.push(objetoCliente)

        console.log(clientesLocalFilter)

        localStorage.setItem('clientes', JSON.stringify(clientesLocalFilter))

    }

    eliminar(id) {
        const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes'))
        const FilteerclientesLocalStorage = clientesLocalStorage.filter((cliente) => {
          
            return cliente.id != id
        
        })

        console.log(FilteerclientesLocalStorage)

        localStorage.setItem('clientes', JSON.stringify(FilteerclientesLocalStorage))
        ipc.send('actpri')
    }


}

class Notas {
    constructor() {

    }
    agregando(notaNueva) {
        const objetoNota = {
            
            notaNueva,
            id: Date.now(),
        }

        listaNotas.push(objetoNota)
        localStorage.setItem('notas', JSON.stringify(listaNotas))
    }

    editada(notaNueva , id){
        const NotasLocal = JSON.parse(localStorage.getItem('notas'));
        console.log(NotasLocal);
        const objetoNota = {
            notaNueva,
            id
        }

        console.log(objetoNota);
        const notaLocalFilter = NotasLocal.filter((nota) =>{
            return nota.id != id
        });

        console.log(notaLocalFilter);

        notaLocalFilter.push(objetoNota);

        console.log(notaLocalFilter);

        localStorage.setItem('notas', JSON.stringify(notaLocalFilter));


        
    }

    Borrar(id) {
        const listaNotasLocalStorage = JSON.parse(localStorage.getItem('notas'))
        const FilteernotasLocalStorage = listaNotasLocalStorage.filter((nota) => {
          
            return nota.id != id
        
        })

        console.log(FilteernotasLocalStorage)

        localStorage.setItem('notas', JSON.stringify(FilteernotasLocalStorage))
        ipc.send('nuevasnotas')
    }

}


export const cliente = new Clientes();
export const ui = new UI()
export const notas = new Notas();
// instancia

// funciones
function agregarCliente() {
    ipc.send('agregarCliente')
}

function agregarNota() {
    ipc.send('agregarNota');
}

function editarcliente(e) {
    if (e.target.classList.contains('editar')) {
        console.log(e.target.dataset.id)
        ipc.send('editarCliente', e.target.dataset.id)
    }
    if (e.target.classList.contains('eliminar')) {
        cliente.eliminar(e.target.dataset.id)
    }
}

function buscarCliente(e) {

    console.log(e.target.value)

    const listaclientesFilter = listaclientes.filter((element) => {
        return element.nombre.toUpperCase().includes(e.target.value.toUpperCase()) || element.apellido.toUpperCase().includes(e.target.value.toUpperCase())
    })

    ui.mostrarClientes(listaclientesFilter.reverse())
}

function eliminarNota(e){
     if(e.target.classList.contains('editar')){
        console.log(e.target.dataset.id);
        ipc.send('editarNota', e.target.dataset.id);
    }
    if(e.target.classList.contains('eliminar')){
        notas.Borrar(e.target.dataset.id);
    }
   
    
}

function buscarNotas(e){
    console.log(e.target.value)
    const buscandoNotas = listaNotas.filter((element) =>{
        return element.notaNueva.toUpperCase().includes(e.target.value.toUpperCase());
    })
    ui.mostrarnotas(buscandoNotas.reverse());
}

function limpiarhtml() {
    while (ulLista2.firstChild) {
        ulLista2.removeChild(ulLista2.firstChild)
    }

    
}

function limpiarHTML(){
    while(listadoNotas2.firstChild){
        listadoNotas2.removeChild(listadoNotas2.firstChild);
    }
}

