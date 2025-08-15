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

    // Funzioni per la gestione della migrazione da localStorage a file system
    checkMigrationStatus: () => ipcRenderer.invoke('check-migration-status'),
    markMigrationDone: () => ipcRenderer.invoke('mark-migration-done'),

    // Nuove API per l'esportazione/importazione ZIP.
    // Queste chiameranno i gestori IPC definiti in main.js.
    exportAllDataZip: () => ipcRenderer.invoke('export-all-data-zip'),
    importDataFromFile: () => ipcRenderer.invoke('import-data-from-file'),
    
    // API per ottenere le informazioni sull'applicazione
    getAppInfo: () => ipcRenderer.invoke('get-app-info'),
});

// Messaggio di log per indicare che preload.js è stato caricato
console.log('preload.js caricato con successo.');
