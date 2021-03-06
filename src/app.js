// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import { remote, ipcRenderer as ipc } from 'electron';
import jetpack from 'fs-jetpack';
import { greet } from './hello_world/hello_world';
import env from './env';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());


// Holy crap! This is browser window with HTML and stuff, but I can read
// here files form disk like it's node.js! Welcome to Electron world :)

document.getElementById('create_device').addEventListener("click", () => {
  ipc.send('create_device', 'ping');
});

document.getElementById('connect_device').addEventListener("click", () => {
  ipc.send('connect_device', 'ping');
});
