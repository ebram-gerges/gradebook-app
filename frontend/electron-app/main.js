const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
	// Create the browser window
	mainWindow = new BrowserWindow({
		width: 1400,
		height: 900,
		minWidth: 1000,
		minHeight: 700,
		backgroundColor: "#0f0f1e",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
		show: false,
		frame: true,
		titleBarStyle: "default",
	});

	// Hide the menu bar for modern look
	Menu.setApplicationMenu(null);

	// Load the index.html
	mainWindow.loadFile("index.html");

	// Show window when ready
	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});

	// Open DevTools in development (optional - comment out for production)
	// mainWindow.webContents.openDevTools();

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
