// preload.js
// Questo script viene eseguito nel processo di rendering prima che il contenuto web carichi.
// Ha accesso sia alle API del browser (window, document) che a un sottoinsieme delle API Node.js.
// Viene utilizzato per esporre in modo sicuro le funzionalità Node.js al contesto isolato del rendering.

const { contextBridge, ipcRenderer } = require('electron');

// Espone un oggetto globale 'electronAPI' al contesto del browser (window.electronAPI).
// Questo permette al codice React (in vitelli.js) di chiamare in modo sicuro le funzioni del processo principale.
contextBridge.exposeInMainWorld('electronAPI', {
    // Funzioni per la gestione dei dati dei vitelli (salvataggio/caricamento)
    saveCalfData: (data) => ipcRenderer.invoke('save-calf-data', data),
    loadCalfData: () => ipcRenderer.invoke('load-calf-data'),

    // Funzioni per la gestione della configurazione globale (salvataggio/caricamento)
    saveConfig: (config) => ipcRenderer.invoke('save-config', config),
    loadConfig: () => ipcRenderer.invoke('load-config'),

    // Nuove API per l'esportazione/importazione ZIP/JSON.
    exportAllDataZip: () => ipcRenderer.invoke('export-all-data-zip'),
    importDataFromFile: () => ipcRenderer.invoke('import-data-from-file'),

    // Funzione per ottenere la versione dell'app dal main process
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
});

// Messaggio di debug per verificare che preload.js sia stato caricato
console.log('preload.js caricato.');
