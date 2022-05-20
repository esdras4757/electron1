// variables
const electron = require("electron");
const ipc = electron.ipcRenderer
const buttonAddUser = document.querySelector('#btnAgregarCliente')

let listaclientes = JSON.parse(localStorage.getItem('clientes'))
let listaNotas = JSON.parse(localStorage.getItem('notas'))
let diaFromLS = localStorage.getItem('dia')

var changeDivisa = document.querySelector('#changeDivisa')
const buttonAddNota = document.querySelector('#agregar');
const buttonEditarCliente = document.querySelector('#lista');
const buttonEditarCliente2 = document.querySelector('#listaCompleta')
const cantidadClientes = document.querySelector('.cantidadClientes')
const ingresos = document.querySelector('#ingresos')
const buscar = document.querySelector('#buscar')
const ulLista = document.querySelector('#lista')
const ulLista2 = document.querySelector('#listaCompleta')
const listadoNotas = document.querySelector('#listadoNotas');
const listadoNotas2 = document.querySelector('#ListaNotas');
const BtnEditarNotas = document.querySelector('#listadoNotas');
const BtnEditarNotas2 = document.querySelector('#ListaNotas');
const cantidadNotas = document.querySelector('#notareciente')
const buscador = document.querySelector('#buscador');


var divisaTolocalstorage = {};
const dia = new Date()
const numeroDelDia = dia.getDay()
var valordivisa = 0;
// documento listo 

document.addEventListener('DOMContentLoaded', () => {

    // validacion dia de consulta de divisa 



    // inicio consumo de api para cambio de divisa

    if (!diaFromLS || diaFromLS != numeroDelDia) {
        console.log(diaFromLS)
        const meta = {
            'apikey': 'WZqdsSUy3oAPlQvJlaxfaSopwt7khwGx'
        }

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: meta
        };

        fetch("https://api.apilayer.com/exchangerates_data/convert?to=MXN&from=USD&amount=500", requestOptions)
            .then(response => response.text())
            .then(result => {
                divisaTolocalstorage = result;
                localStorage.setItem('divisa', divisaTolocalstorage);
                console.log(divisaTolocalstorage);
            })
            .then(localStorage.setItem('dia', numeroDelDia))
            .catch(error => console.log('error', error));


    }




    // fin consumo de api para cambio de divisa


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

        const nohay = document.createElement('h4')
        nohay.textContent = 'No hay notas agregadas'
        nohay.className = "p-5 text-center "
        if (BtnEditarNotas) {
            BtnEditarNotas.appendChild(nohay)
        }

        if (BtnEditarNotas2) {
            BtnEditarNotas2.appendChild(nohay)
            console.log('No hay notas')
        }


    }

    
    let total = 0
    if (ingresos) {
        listaclientes.forEach(element => {
            if (element.divisa == 'USD') {
                var valorConvertidoMXN = (element.inversion * consultarValorDolar()).toFixed(2)
                total += parseFloat(valorConvertidoMXN)
            }
            else {
                total += parseFloat(element.inversion)
            }

        });
        ingresos.textContent = `${total} MXN`;
    }



    eventListeners();
    ui.mostrarClientes()
    ui.mostrarnotas();
    consultarValorDolar()

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

    if (BtnEditarNotas) {
        BtnEditarNotas.addEventListener('click', eliminarNota);
    }

    if (BtnEditarNotas2) {
        BtnEditarNotas2.addEventListener('click', eliminarNota);
    }

    if (buscador) {
        buscador.addEventListener('keyup', buscarNota);
    }


}


// clases

class UI {
    constructor() {
    }

    mensajeError(mensaje, tipo) {

        const nota = document.querySelector('#formularioNota')

        const msjhtml = document.createElement('div');
        msjhtml.classList.add('p-3', 'm-3', 'text-center', 'alert')
        msjhtml.textContent = mensaje

        if (tipo == 'error') {
            msjhtml.classList.add('alert-danger')
        }
        else {
            msjhtml.classList.add('alert-success')
        }

        nota.insertBefore(msjhtml, document.querySelector('#btnota'))

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

        const dolar = consultarValorDolar();

        let listaclientesparcial

        if (ulLista) {
            listaclientesparcial = listaclientes.slice(-5)
        }

        if (ulLista) {
            listaclientesparcial.reverse().forEach(cliente => {

                if (cliente.divisa == 'USD') {
                    var clien = (cliente.inversion * consultarValorDolar()).toFixed(2);
                } else {
                    clien = (cliente.inversion / 1).toFixed(2);
                }

                const clientehtml = document.createElement('li')
                clientehtml.classList.add('list-unstyled', 'd-flex')
                clientehtml.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                    <ul id="column" class="d-flex">
                            <li id="nombre" data-id=${cliente.id}>${cliente.nombre}</li> 
                            <li id="apellido">${cliente.apellido} </li> 
                            <li id="numero">${cliente.numero} </li> 
                            <li id="inversion"><a>${clien}</a><select class="border-0 mr-1 changeDivisa" id="changeDivisa"><option >MXN</option><option>USD</option></select> </li> 
                            <li id="idv" class="d-none">${cliente.id} </li> 
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

                if (cliente.divisa == 'USD') {
                    var clien = (cliente.inversion * consultarValorDolar()).toFixed(2);
                } else {
                    clien = (cliente.inversion / 1).toFixed(2);
                }

                const clientehtml = document.createElement('li')
                clientehtml.classList.add('list-unstyled', 'd-flex')
                clientehtml.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                    <ul id="column" class="d-flex">
                            <li id="nombre"  data-id=${cliente.id}>${cliente.nombre}</li> 
                            <li id="apellido">${cliente.apellido} </li> 
                            <li id="pais">${cliente.pais} </li>
                            <li id="numero">${cliente.numero} </li> 
                            <li id="correo">${cliente.correo} </li> 
                            <li id="inversion"> <a>${clien}</a><select class="border-0 changeDivisa" id="changeDivisa"><option >MXN</option><option>USD</option></select> </li> 
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


        // changeDivisa=document.querySelector('#changeDivisa')

        // if (changeDivisa) {
        //     changeDivisa.addEventListener('change',switchDLSMXN)
        // }

    }

    mostrarnotas(listas = listaNotas) {
        let listanotitas

        
        if(cantidadNotas){
            listanotitas = listaNotas.slice(-1)
        }
        if(cantidadNotas){
            listanotitas.reverse().forEach(nota => {

                const notahtml = document.createElement('p')
                notahtml.classList.add('text-center' , 'h5')
                notahtml.innerHTML = `
               
                            <p class="card-text">${nota.notaNueva}</p>
                                
                `
               
                if(cantidadNotas){
                    cantidadNotas.appendChild(notahtml)
                }
            });

        }
        if (listadoNotas) {
            listanotitas = listaNotas.slice(-6)
        }

        if (listadoNotas) {
            listanotitas.reverse().forEach(nota => {

                const notahtml = document.createElement('li')
                notahtml.classList.add('list-unstyled', 'd-inline-block')
                notahtml.innerHTML = `
                <div class="row row-cols-1 row-cols-md-1 g-2 m-3">
                    
                         <div class="card border-warning">
                             <div class="card-body">
                             <h3 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-stickies-fill" viewBox="0 0 16 16">
                             <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z"/>
                             <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z"/>
                           </svg></h3>
                            <p class="card-text">${nota.notaNueva}</p>
                                <button class="editar btn btn-success m-2" data-id=${nota.id}>Editar</button>
                                <button class="eliminar btn btn-danger m-2" data-id=${nota.id}>Eliminar</button>
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
            limpiarHTML()

            if (listas.length <= 0) {

                const nohay = document.createElement('h4')
                nohay.textContent = 'No hay notas agregados'
                nohay.className = "p-5 text-center "
                BtnEditarNotas2.appendChild(nohay)
                console.log('no hay notas')

                return
            }
            listas.reverse().forEach(nota => {

               
                const notahtml = document.createElement('li')
                notahtml.classList.add('list-unstyled', 'd-inline-block')
                notahtml.innerHTML = `
                <div class="row row-cols-1 row-cols-md-1 g-2 m-3">
                    
                         <div class="card border-warning">
                             <div class="card-body">
                             <h3 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-stickies-fill" viewBox="0 0 16 16">
                             <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z"/>
                             <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z"/>
                           </svg></h3>
                            <p class="card-text">${nota.notaNueva}</p>
                                <button class="editar btn btn-success m-2" data-id=${nota.id}>Editar</button>
                                <button class="eliminar btn btn-danger m-2" data-id=${nota.id}>Eliminar</button>
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

    agregar(nombre, apellido, pais, numero, correo, inversion, divisa, modalidad, forma) {


        const objetoCliente = {
            nombre,
            apellido,
            pais,
            numero,
            correo,
            inversion,
            divisa,
            modalidad,
            forma,
            id: Date.now()
        }

        listaclientes.push(objetoCliente)
        localStorage.setItem('clientes', JSON.stringify(listaclientes))

        console.log(listaclientes)
    }

    editar(nombre, apellido, pais, numero, correo, inversion, divisa, modalidad, forma, idn) {
        const ClientesLocal = JSON.parse(localStorage.getItem('clientes'))

        console.log(ClientesLocal)

        const objetoCliente = {
            nombre,
            apellido,
            pais,
            numero,
            correo,
            inversion,
            divisa,
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
            return cliente.id != id;
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

    editada(notaNueva , id) {
        const NotasLocal = JSON.parse(localStorage.getItem('notas'))

        console.log(NotasLocal)

        const objetoNota = {
           notaNueva,
            id
        }

        console.log(objetoNota)

        const notasLocalFilter = NotasLocal.filter((nota) => {
            return nota.id != id
        })

        console.log(notasLocalFilter)

        notasLocalFilter.push(objetoNota)

        console.log(notasLocalFilter)

        localStorage.setItem('notas', JSON.stringify(notasLocalFilter))

    }

   Borrar (id) {
        const notasLocalStorage = JSON.parse(localStorage.getItem('notas'))
        const FilteernotasLocalStorage = notasLocalStorage.filter((nota) => {
            return nota.id != id;
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
    if (e.target.classList.contains('changeDivisa')) {
        switchDLSMXN(e)
    }
}

function eliminarNota(e){
    if (e.target.classList.contains('editar')) {
        console.log(e.target.dataset.id)
        ipc.send('editarNota', e.target.dataset.id)
    }
    if (e.target.classList.contains('eliminar')) {
        notas.Borrar(e.target.dataset.id)
    }
}
function buscarCliente(e) {

    console.log(e.target.value)

    const listaclientesFilter = listaclientes.filter((element) => {
        return element.nombre.toUpperCase().includes(e.target.value.toUpperCase()) || element.apellido.toUpperCase().includes(e.target.value.toUpperCase())
    })

    ui.mostrarClientes(listaclientesFilter.reverse())
}

function buscarNota(e){
    console.log(e.target.value)

    const listanotasFilter = listaNotas.filter((element) => {
        return element.notaNueva.toUpperCase().includes(e.target.value.toUpperCase())
    })

    ui.mostrarnotas(listanotasFilter.reverse())
}


function limpiarhtml() {
    while (ulLista2.firstChild) {
        ulLista2.removeChild(ulLista2.firstChild)
    }
}

function limpiarHTML(){
    while (listadoNotas2.firstChild) {
        listadoNotas2.removeChild(listadoNotas2.firstChild)
    }
}

function consultarValorDolar() {
    let dolar = JSON.parse(localStorage.getItem('divisa')).info.rate
    return dolar;
}

function switchDLSMXN(e) {
    var valor;
    const id = e.target.parentElement.parentElement.querySelector('#nombre').dataset.id

    const lista = JSON.parse(localStorage.getItem('clientes'))
    const listaFilter = lista.filter((element) => {
        return element.id == id
    })

    if (listaFilter[0].divisa == 'USD') {

        valor = listaFilter[0].inversion * consultarValorDolar()
    }
    else {
        valor = listaFilter[0].inversion
    }


    if (e.target.value == 'USD') {
        e.target.parentElement.querySelector('a').textContent = (valor / consultarValorDolar()).toFixed(2)

    }
    if (e.target.value == 'MXN') {

        e.target.parentElement.querySelector('a').textContent = (valor / 1).toFixed(2)
    }




}