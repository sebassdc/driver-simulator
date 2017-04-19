// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
const crypto = require('crypto');
import fs from 'fs';
import {
	app,
	Menu,
	ipcMain as ipc,
	dialog
} from 'electron';
import {
	devMenuTemplate
} from './menu/dev_menu_template';
import {
	editMenuTemplate
} from './menu/edit_menu_template';
import createWindow from './helpers/window';
import jetpack from 'fs-jetpack';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

const setApplicationMenu = () => {
	const menus = [editMenuTemplate];
	if (env.name !== 'production') {
		menus.push(devMenuTemplate);
	}
	Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
	const userDataPath = app.getPath('userData');
	app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
	setApplicationMenu();

	const mainWindow = createWindow('main', {
		width: 400,
		height: 600,
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app.html'),
		protocol: 'file:',
		slashes: true,
	}));

	if (env.name === 'development') {
		mainWindow.openDevTools();
	}
});

app.on('window-all-closed', () => {
	app.quit();
});

let creatorWindow;
ipc.on('create_device', (event, arg) => {
	creatorWindow = createWindow('creator', {
		width: 400,
		height: 600,
	});
	creatorWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'device_creator.html'),
		protocol: 'file:',
		slashes: true,
	}));
});

ipc.on('open-error-dialog', (event, arg) => {
	dialog.showErrorBox('ERROR', arg);
});

ipc.on('genera-dispositivo', (event, arg) => {
	const options = {
		title: 'Selecciona un directorio para guardar tu dispositivo',
		filters: [
			{
				name: "Json",
				extensions: ['json']
			}
    ]
	}
	dialog.showSaveDialog(options, (filename) => {
		jetpack.write(filename, arg);
		let algoritmo = 'md5';
		let shasum = crypto.createHash(algoritmo);
		let s = jetpack.read(filename);
		shasum.update(s)
		let d = shasum.digest('hex');
		dialog.showSaveDialog({
			title: 'Selecciona un directorio para guardar tu driver',
			filters: [
				{
					name: "Json",
					extensions: ['json']
				}
      ]
		}, (filename) => {
			jetpack.write(filename, Object.assign({
				checksum: d
			}, arg));
		});
	});
});

let conectorWindow;
ipc.on('connect_device', (event, arg) => {
	conectorWindow = createWindow('conector', {
		width: 400,
		height: 600,
	});
	conectorWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'device_conector.html'),
		protocol: 'file:',
		slashes: true,
	}));
});

ipc.on('conectar-dispositivo', (event, arg) => {
  console.log(arg.devicePath)
	let device = jetpack.read(arg.device);
	let driver = jetpack.read(arg.driver, 'json');

	// Prueba si son iguales
	let algoritmo = 'md5';
	let shasum = crypto.createHash(algoritmo);
	shasum.update(device)
	let d = shasum.digest('hex');
	if (d == driver["checksum"]) {
		const options = {
			type: 'info',
			title: 'Conectado!',
			message: `¡Se ha instalado el driver y conectado el dispositivo!`
		}
    dialog.showMessageBox(options);
	} else {
		const options = {
			type: 'info',
			title: 'Parece que no es el driver:(',
			message: `Contacta con el fabricante del dispositivo`
		}
    dialog.showMessageBox(options);
	}


});
