// Questo è il file del processo principale di Electron (es. main.js)
// Controlla il ciclo di vita dell'applicazione e la creazione delle finestre.

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron'); // Aggiunto dialog per la selezione file
const path = require('path');
const fs = require('fs'); // Aggiunto fs per operazioni sul filesystem
const os = require('os'); // Aggiunto os per ottenere la directory home dell'utente
const archiver = require('archiver'); // Per la creazione di archivi ZIP
const yauzl = require('yauzl'); // Per la lettura di archivi ZIP

// Determina la directory base per i dati dell'applicazione.
// Utilizza la directory "Documents" dell'utente per la cartella "Svezzamento/config".
// Questo assicura che i file siano salvati in un percorso noto e accessibile dall'utente.
const appDataDir = path.join(os.homedir(), 'Documents', 'Svezzamento', 'config');
// Definisce la directory per i backup
const backupDir = path.join(os.homedir(), 'Documents', 'Svezzamento', 'Backup');

// Definisce i percorsi completi per i file di dati e configurazione all'interno della directory specificata.
const calfDataFilePath = path.join(appDataDir, 'vitelli_data.json');
const configFilePath = path.join(appDataDir, 'config_data.json');
const migrationStatusFilePath = path.join(appDataDir, 'migration_status.json');

// Assicurati che le directory esistano all'avvio dell'applicazione.
// Se le directory non esistono, vengono create ricorsivamente.
try {
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir, { recursive: true });
  }
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
} catch (err) {
  console.error(`Errore durante la creazione delle directory:`, err);
  // Potresti voler gestire questo errore in modo più robusto, ad esempio, mostrando un messaggio all'utente.
}

function createWindow() {
  // Crea la finestra del browser.
  const mainWindow = new BrowserWindow({
    width: 1000, // Larghezza iniziale della finestra
    height: 700, // Altezza iniziale della finestra
    minWidth: 800, // Larghezza minima consentita
    minHeight: 600, // Altezza minima consentita
    webPreferences: {
      // Lo script preload.js viene eseguito prima che gli script della pagina web vengano caricati.
      // Ha accesso sia alle API Node.js che alle API DOM, ma è isolato per sicurezza.
      preload: path.join(__dirname, 'preload.js'), // Abilitato lo script preload
      nodeIntegration: false, // Disabilita l'integrazione di Node.js nel renderer per sicurezza (raccomandato)
      contextIsolation: true, // Abilita l'isolamento del contesto per sicurezza (raccomandato)
    },
    autoHideMenuBar: true // Nasconde automaticamente la barra dei menu
  });

  // Carica il file HTML principale della tua applicazione React.
  // Assicurati che 'index.html' sia nel percorso corretto rispetto a questo file.
  mainWindow.loadFile('index.html');

  // Imposta la visibilità della barra dei menu su false per nasconderla completamente.
  mainWindow.setMenuBarVisibility(false);


  // Apri gli Strumenti per sviluppatori (DevTools) se l'applicazione non è in produzione.
  // if (!app.isPackaged) {
  //   mainWindow.webContents.openDevTools();
  // }
}

// Quando Electron ha finito di inizializzare ed è pronto per creare finestre del browser.
// Alcune API possono essere usate solo dopo che questo evento si verifica.
app.whenReady().then(() => {
  createWindow();

  // Gestore IPC per il salvataggio dei dati dei vitelli
  ipcMain.handle('save-calf-data', async (event, data) => {
    try {
      fs.writeFileSync(calfDataFilePath, JSON.stringify(data, null, 2), 'utf8');
      return { success: true };
    } catch (error) {
      console.error('Errore durante il salvataggio dei dati dei vitelli:', error);
      return { success: false, error: error.message };
    }
  });

  // Gestore IPC per il caricamento dei dati dei vitelli
  ipcMain.handle('load-calf-data', async () => {
    try {
      if (fs.existsSync(calfDataFilePath)) {
        const data = fs.readFileSync(calfDataFilePath, 'utf8');
        return { success: true, data: JSON.parse(data) };
      }
      return { success: true, data: [] }; // Restituisce un array vuoto se il file non esiste
    } catch (error) {
      console.error('Errore durante il caricamento dei dati dei vitelli:', error);
      return { success: false, error: error.message };
    }
  });

  // Gestore IPC per il salvataggio della configurazione
  ipcMain.handle('save-config', async (event, config) => {
    try {
      fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
      return { success: true };
    } catch (error) {
      console.error('Errore durante il salvataggio della configurazione:', error);
      return { success: false, error: error.message };
    }
  });

  // Gestore IPC per il caricamento della configurazione
  ipcMain.handle('load-config', async () => {
    try {
      if (fs.existsSync(configFilePath)) {
        const config = fs.readFileSync(configFilePath, 'utf8');
        return { success: true, data: JSON.parse(config) };
      }
      return { success: true, data: {} }; // Restituisce un oggetto vuoto se il file non esiste
    } catch (error) {
      console.error('Errore durante il caricamento della configurazione:', error);
      return { success: false, error: error.message };
    }
  });

  // Gestore IPC per controllare lo stato della migrazione
  ipcMain.handle('check-migration-status', async () => {
    try {
      if (fs.existsSync(migrationStatusFilePath)) {
        const status = fs.readFileSync(migrationStatusFilePath, 'utf8');
        return { success: true, data: JSON.parse(status) };
      }
      return { success: true, data: { done: false } };
    } catch (error) {
      console.error('Errore durante il controllo dello stato della migrazione:', error);
      return { success: false, error: error.message };
    }
  });

  // Gestore IPC per marcare la migrazione come completata
  ipcMain.handle('mark-migration-done', async () => {
    try {
      fs.writeFileSync(migrationStatusFilePath, JSON.stringify({ done: true }), 'utf8');
      return { success: true };
    } catch (error) {
      console.error('Errore durante la marcatura della migrazione:', error);
      return { success: false, error: error.message };
    }
  });

  // Gestore IPC per l'esportazione di tutti i dati in un file ZIP
  ipcMain.handle('export-all-data-zip', async (event) => {
    // Il percorso di salvataggio è ora fisso nella directory di backup
    const filePath = path.join(backupDir, `Svezzamento_Dati_Backup_${new Date().toISOString().slice(0,10)}.zip`);

    return new Promise((resolve) => {
      const output = fs.createWriteStream(filePath);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Livello di compressione massimo
      });

      output.on('close', () => {
        resolve({ success: true, filePath: filePath, message: 'Dati esportati con successo!' });
      });

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.warn('Avviso archiver:', err);
        } else {
          console.error('Errore archiver:', err);
          resolve({ success: false, error: err.message });
        }
      });

      archive.on('error', (err) => {
        console.error('Errore archiver:', err);
        resolve({ success: false, error: err.message });
      });

      archive.pipe(output);

      // Aggiungi i file dalla directory di configurazione alla radice dello ZIP
      if (fs.existsSync(calfDataFilePath)) {
        archive.file(calfDataFilePath, { name: path.basename(calfDataFilePath) });
      } else {
        console.warn(`File non trovato per l'esportazione: ${calfDataFilePath}`);
      }
      if (fs.existsSync(configFilePath)) {
        archive.file(configFilePath, { name: path.basename(configFilePath) });
      } else {
        console.warn(`File non trovato per l'esportazione: ${configFilePath}`);
      }
      if (fs.existsSync(migrationStatusFilePath)) {
        archive.file(migrationStatusFilePath, { name: path.basename(migrationStatusFilePath) });
      } else {
        console.warn(`File non trovato per l'esportazione: ${migrationStatusFilePath}`);
      }

      archive.finalize();
    });
  });

  // Gestore IPC per l'importazione di dati da un file ZIP o JSON
  ipcMain.handle('import-data-from-file', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const { filePaths } = await dialog.showOpenDialog(window, {
      title: 'Importa dati',
      properties: ['openFile'],
      filters: [
        { name: 'File di Dati Svezzamento', extensions: ['zip', 'json'] },
        { name: 'Tutti i file', extensions: ['*'] }
      ]
    });

    if (!filePaths || filePaths.length === 0) {
      return { success: false, message: 'Importazione annullata.' };
    }

    const sourceFilePath = filePaths[0];
    const fileExtension = path.extname(sourceFilePath).toLowerCase();

    if (fileExtension === '.json') {
      // Se è un file JSON, prova a importarlo come dati vitelli o configurazione
      try {
        const jsonData = fs.readFileSync(sourceFilePath, 'utf8');
        const parsedData = JSON.parse(jsonData);

        if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'object' && item !== null && 'id' in item)) {
          // Sembra essere un file di dati vitelli
          fs.writeFileSync(calfDataFilePath, JSON.stringify(parsedData, null, 2), 'utf8');
          return { success: true, message: 'Dati vitelli importati con successo!' };
        } else if (typeof parsedData === 'object' && parsedData !== null) {
          // Sembra essere un file di configurazione
          fs.writeFileSync(configFilePath, JSON.stringify(parsedData, null, 2), 'utf8');
          return { success: true, message: 'Configurazione importata con successo!' };
        } else {
          console.error('Formato JSON non riconosciuto per l\'importazione.');
          return { success: false, error: 'Formato JSON non riconosciuto.' };
        }
      } catch (error) {
        console.error('Errore durante l\'importazione del file JSON:', error);
        return { success: false, error: `Errore durante l'importazione del file JSON: ${error.message}` };
      }
    } else if (fileExtension === '.zip') {
      // Se è un file ZIP, estrai i file e salvali nelle posizioni corrette
      return new Promise((resolve) => {
        yauzl.open(sourceFilePath, { lazyEntries: true }, (err, zipfile) => {
          if (err) {
            console.error('Errore nell\'apertura del file ZIP:', err);
            return resolve({ success: false, error: `Errore nell'apertura del file ZIP: ${err.message}` });
          }

          zipfile.on('entry', (entry) => {
            // Ignora le directory
            if (/\/$/.test(entry.fileName)) {
              zipfile.readEntry();
              return;
            }

            const targetPath = path.join(appDataDir, path.basename(entry.fileName));

            zipfile.openReadStream(entry, (err, readStream) => {
              if (err) {
                console.error(`Errore nella lettura dell'entry ${entry.fileName}:`, err);
                zipfile.readEntry();
                return;
              }

              readStream.on('end', () => {
                zipfile.readEntry();
              });

              const writeStream = fs.createWriteStream(targetPath);
              readStream.pipe(writeStream);
            });
          });

          zipfile.on('end', () => {
            return resolve({ success: true, message: 'Dati importati con successo dal file ZIP!' });
          });

          zipfile.on('error', (err) => {
            console.error('Errore durante l\'estrazione del file ZIP:', err);
            return resolve({ success: false, error: `Errore durante l'estrazione del file ZIP: ${err.message}` });
          });

          zipfile.readEntry(); // Inizia a leggere le entry
        });
      });
    } else {
      console.error('Tipo di file non supportato per l\'importazione:', fileExtension);
      return { success: false, error: 'Tipo di file non supportato. Si prega di selezionare un file .zip o .json.' };
    }
  });

  app.on('activate', () => {
    // Su macOS è comune ri-creare una finestra nell'app quando l'icona del dock viene cliccata
    // e non ci sono altre finestre aperte.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Esci quando tutte le finestre sono chiuse, eccetto su macOS.
// Su macOS le applicazioni e la loro barra dei menu rimangono attive
// fino a quando l'utente non esce esplicitamente con Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Nota importante: Non utilizzare API del DOM (come 'document', 'window') direttamente in questo file (main.js).
// Queste API sono disponibili solo nel processo di rendering (all'interno di vitelli.js).
