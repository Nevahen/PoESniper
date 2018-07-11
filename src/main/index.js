import { app, BrowserWindow, ipcMain } from "electron";
import { SearchItem } from "./models/searchItem";
import * as poeAuth from "./poeauth";
import { SearchManager } from "./searchManager";
import * as clipboardy from "clipboardy";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

const searchManager = new SearchManager(BrowserWindow);

let a = new SearchItem({
  name: "Tabula",
  term: "NK6Ec5",
  league: "Incursion",
  active: false
});

let b = new SearchItem({
  name: "Shavronne",
  term: "AMXPsJ",
  league: "Incursion",
  active: false
});

let c = new SearchItem({
  name: "Jewels",
  term: "jWoZhX",
  league: "Incursion",
  active: false
});

let d = new SearchItem({
  name: "Gems",
  term: "6QadsG",
  league: "Incursion",
  active: false
});

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    resizable: false,
    frame: false,
    width: 1000
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

ipcMain.on("clipboard", (event, data) => {
  clipboardy.writeSync(data);
});

ipcMain.on("getSearchList", event => {
  console.log("Got request for SearchList");
  event.sender.send("searchList", searchManager.getSearchItems());
});

ipcMain.on("toggleSearch", (event, data) => {
  searchManager.toggleSearch(data);
});

ipcMain.on("login", (event, data) => {
  poeAuth.verifySessionId(data).then(resp => event.sender.send("login", resp));
});

app.testo = () => {
  return "wat";
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("newSearch", (event, data) => {
  let searchItem = new SearchItem(data);
  searchItem.league = "Incursion";
  searchItem.active = false;
  searchManager.addSearchItem(searchItem);
  event.sender.send("searchList", searchManager.getSearchItems());
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
