const { BrowserWindow, app } = require( 'electron' );

require('@electron/remote/main').initialize()

function createWindow ()
{

    const win = new BrowserWindow( {
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    } );

    win.loadURL( 'http://localhost:3000' );

}

app.on( 'ready', createWindow );