const {app,BrowserWindow} = require('electron');

let appWindow;

function crearVentana(){
    appWindow = new BrowserWindow({
        center: true,
        show: false,

    });

    appWindow.loadURL('http://localhost:3000');

    appWindow.once('ready-to-show', ()=>{
        appWindow.show();
    })

}

app.on('ready', crearVentana);

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', ()=>{
    if(appWindow === null){
        crearVentana();
    }
})