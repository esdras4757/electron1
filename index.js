const{app, BrowserWindow, Menu , ipcMain}=require('electron');
const url=require('url')
const path =require('path');

require ( 'electron-reload' ) ( __dirname ,  {  
  } ) ;


let mainWindow
let secondWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({
        width:4000,
        height:4000,
        maximied:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    mainWindow.loadURL(`file://${__dirname}/views/index.html`)

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
       
    })

    addNotaWindow.loadFile('views/addNota.html')
})

                  
