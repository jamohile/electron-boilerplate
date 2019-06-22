const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const isDev = process.env.NODE_ENV == 'development';

function createWindow(){
	mainWindow = new BrowserWindow({width: 900, height: 680});
	if(isDev){
		mainWindow.loadURL('http://localhost:1234');
	}else{
		mainWindow.loadFile('./build/index.html');
	}

	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activate', () => {
	if(mainWindow === null){
		createWindow();
	}
})