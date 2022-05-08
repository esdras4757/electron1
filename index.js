const{app, BrowserWindow, Menu}=require('electron');
const url=require('url')
const path =require('path');


require ( 'electron-reload' ) ( __dirname ,  {  
  } ) ;


let mainWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({
        width:900,
        height:700
    });
    
    mainWindow.loadURL(`file://${__dirname}/views/index.html`)

    const mainMenu=null
    Menu.setApplicationMenu(mainMenu)
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