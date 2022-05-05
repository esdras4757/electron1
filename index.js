const{app, BrowserWindow, Menu}=require('electron');
const url=require('url')
const path =require('path');



let mainWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol:'file',
        slashes:true
    }))

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