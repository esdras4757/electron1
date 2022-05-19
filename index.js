const{app, BrowserWindow, Menu , ipcMain}=require('electron');
const url=require('url')
const path =require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


require ( 'electron-reload' ) ( __dirname ,  {  
  } ) ;


let mainWindow
let addClientWindow
let addNotaWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({
        width:4000,
        height:4000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    mainWindow.loadURL(`file://${__dirname}/views/index.html`)

    mainWindow.maximize();

    

    // const mainMenu=Menu.buildFromTemplate([])
    // Menu.setApplicationMenu(mainMenu)

})






const templateMenu=[
    {
        label:'Deudores',
        submenu:[
            {
                label:'NewProduct'
            }
        ]
    },
    {
        label:'exit2e',
        submenu:[
            {
                label:'NewProduct'
            }
        ]
    }
]

if(process.env.NODE_ENV !=='production'){

    
}
ipcMain.on('agregarCliente', (event) => {
    addClientWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    addClientWindow.loadFile('views/windowAddClient.html')

    
})

ipcMain.on('actpri', (event) => {
    mainWindow.reload()
})
ipcMain.on('agregarNota', (event) => {
    addNotaWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
       
    })

    addNotaWindow.loadFile('views/addNota.html')
})

ipcMain.on('nuevasnotas' , (event) =>{
    mainWindow.reload();
})

ipcMain.on('editarNota' , (event , mensaje) =>{
    console.log(mensaje)
    addNotaWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
        
})
addNotaWindow.loadFile('views/edicionNota.html')
addNotaWindow.on('ready-to-show',()=>{
    setTimeout(() => {
   addNotaWindow.webContents.send('Idrecibido',mensaje)
    }, 100);
})
})

ipcMain.on('editarCliente', (event,mensaje) => {
    console.log(mensaje)
    addClientWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    addClientWindow.loadFile('views/windowEditClient.html')

    addClientWindow.on('ready-to-show',()=>{
        setTimeout(() => {
       addClientWindow.webContents.send('recibirId',mensaje)
        }, 100);
    })
})         
