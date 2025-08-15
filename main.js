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

// Assicurati che la directory esista al momento dell'avvio
fs.mkdirSync(appDataDir, { recursive: true });
fs.mkdirSync(backupDir, { recursive: true });

// Funzione per salvare i dati in un file JSON
function saveJsonToFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error(`Errore durante il salvataggio del file ${filePath}:`, error);
    return { success: false, error: error.message };
  }
}

// Funzione per caricare i dati da un file JSON
function loadJsonFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return { success: true, data: JSON.parse(data) };
    }
    return { success: true, data: null }; // Il file non esiste, nessun dato
  } catch (error) {
    console.error(`Errore durante il caricamento del file ${filePath}:`, error);
    return { success: false, error: error.message };
  }
}

// Funzione per controllare lo stato di migrazione
ipcMain.handle('check-migration-status', async () => {
  const result = loadJsonFromFile(migrationStatusFilePath);
  if (result.success && result.data && result.data.migrated) {
    return true;
  }
  return false;
});

// Funzione per marcare la migrazione come completata
ipcMain.handle('mark-migration-done', async () => {
  return saveJsonToFile(migrationStatusFilePath, { migrated: true });
});

// Funzione per la creazione della finestra principale
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800, // Larghezza minima
    minHeight: 600, // Altezza minima
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Disabilita contextIsolation per l'accesso diretto a window.electronAPI
      // È raccomandato abilitare contextIsolation e usare contextBridge in preload.js
      contextIsolation: true, // Questo dovrebbe essere true per sicurezza
      nodeIntegration: false, // E questo dovrebbe essere false
    },
    icon: path.join(__dirname, 'icon.ico'), // Assicurati di avere un file icon.ico nella stessa directory di main.js
  });

  // Carica il file index.html dell'app.
  win.loadFile('index.html');

};

// Questo metodo verrà chiamato quando Electron avrà finito
// di inizializzare e sarà pronto per creare finestre browser.
// Alcune API possono essere usate solo dopo che questo evento occorre.
app.whenReady().then(() => {
  createWindow();

  // Rimuove la barra del menu dell'applicazione
  Menu.setApplicationMenu(null);

  // Gestori IPC (Inter-Process Communication)
  ipcMain.handle('save-calf-data', async (event, data) => {
    return saveJsonToFile(calfDataFilePath, data);
  });

  ipcMain.handle('load-calf-data', async () => {
    return loadJsonFromFile(calfDataFilePath);
  });

  ipcMain.handle('save-config', async (event, config) => {
    return saveJsonToFile(configFilePath, config);
  });

  ipcMain.handle('load-config', async () => {
    return loadJsonFromFile(configFilePath);
  });

  // Gestore per ottenere le informazioni sull'applicazione
  ipcMain.handle('get-app-info', async () => {
    return {
      name: app.getName(),
      version: app.getVersion(),
    };
  });

  // Gestore per l'esportazione ZIP
  ipcMain.handle('export-all-data-zip', async () => {
    return new Promise(async (resolve) => {
      const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
      const zipFileName = `svezzamento_data_backup_${timestamp}.zip`;
      const outputPath = path.join(backupDir, zipFileName);

      const output = fs.createWriteStream(outputPath);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Livello di compressione massimo
      });

      output.on('close', () => {
        console.log(`Archivio ZIP creato: ${outputPath}, ${archive.pointer()} bytes totali`);
        dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
          type: 'info',
          title: 'Esportazione Completata',
          message: `Backup dei dati salvato in:\n${outputPath}`,
          buttons: ['OK']
        });
        resolve({ success: true, path: outputPath });
      });

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.warn('Avviso archiver:', err);
        } else {
          throw err;
        }
      });

      archive.on('error', (err) => {
        console.error('Errore archiver:', err);
        dialog.showErrorBox('Errore di Esportazione', `Errore durante la creazione del backup ZIP: ${err.message}`);
        resolve({ success: false, error: err.message });
      });

      archive.pipe(output);

      // Aggiungi i file di dati e configurazione all'archivio
      if (fs.existsSync(calfDataFilePath)) {
        archive.file(calfDataFilePath, { name: path.basename(calfDataFilePath) });
      }
      if (fs.existsSync(configFilePath)) {
        archive.file(configFilePath, { name: path.basename(configFilePath) });
      }
      if (fs.existsSync(migrationStatusFilePath)) {
        archive.file(migrationStatusFilePath, { name: path.basename(migrationStatusFilePath) });
      }

      archive.finalize();
    });
  });

  // Gestore per l'importazione di dati
  ipcMain.handle('import-data-from-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
      properties: ['openFile'],
      filters: [
        { name: 'Dati Svezzamento', extensions: ['zip', 'json'] },
        { name: 'Tutti i File', extensions: ['*'] }
      ]
    });

    if (canceled || filePaths.length === 0) {
      return { success: false, message: 'Importazione annullata dall\'utente.' };
    }

    const filePath = filePaths[0];
    const fileExtension = path.extname(filePath).toLowerCase();

    if (fileExtension === '.json') {
      // Importazione di un singolo file JSON
      return new Promise((resolve) => {
        dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
          type: 'warning',
          title: 'Conferma Sovrascrittura',
          message: 'Stai per importare un file JSON. Questo sovrascriverà i dati esistenti. Vuoi continuare?',
          buttons: ['Sì', 'No'],
          defaultId: 1 // 'No' come default
        }).then(({ response }) => {
          if (response === 0) { // Utente ha cliccato 'Sì'
            try {
              const importedData = fs.readFileSync(filePath, 'utf-8');
              const parsedData = JSON.parse(importedData);

              // Determina quale file sovrascrivere in base al contenuto o al nome del file
              if (filePath.includes('vitelli_data.json') || (parsedData.calves && !parsedData.globalConfig)) {
                saveJsonToFile(calfDataFilePath, parsedData);
                resolve({ success: true, message: 'Dati vitelli importati con successo!' });
              } else if (filePath.includes('config_data.json') || (parsedData.globalConfig && !parsedData.calves)) {
                saveJsonToFile(configFilePath, parsedData);
                resolve({ success: true, message: 'Configurazione importata con successo!' });
              } else if (parsedData.calves && parsedData.globalConfig) {
                // Se il JSON contiene sia vitelli che config, salvali entrambi
                saveJsonToFile(calfDataFilePath, parsedData.calves);
                saveJsonToFile(configFilePath, parsedData.globalConfig);
                resolve({ success: true, message: 'Dati vitelli e configurazione importati con successo!' });
              }
              else {
                resolve({ success: false, error: 'Il file JSON selezionato non sembra contenere dati o configurazioni validi per questa applicazione.' });
              }
            } catch (err) {
              console.error('Errore durante l\'importazione del file JSON:', err);
              resolve({ success: false, error: `Errore durante l'importazione del file JSON: ${err.message}` });
            }
          } else {
            resolve({ success: false, message: 'Importazione annullata.' });
          }
        });
      });
    } else if (fileExtension === '.zip') {
      // Importazione da un file ZIP
      return new Promise((resolve) => {
        dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
          type: 'warning',
          title: 'Conferma Sovrascrittura',
          message: 'Stai per importare un file ZIP. Questo sovrascriverà i dati esistenti. Vuoi continuare?',
          buttons: ['Sì', 'No'],
          defaultId: 1 // 'No' come default
        }).then(({ response }) => {
          if (response === 0) { // Utente ha cliccato 'Sì'
            yauzl.open(filePath, { lazyEntries: true }, (err, zipfile) => {
              if (err) {
                console.error('Errore durante l\'apertura del file ZIP:', err);
                return resolve({ success: false, error: `Errore durante l'apertura del file ZIP: ${err.message}` });
              }

              zipfile.on('entry', (entry) => {
                // Estrai solo i file pertinenti (vitelli_data.json, config_data.json, migration_status.json)
                const targetPath = path.join(appDataDir, entry.fileName);

                // Prevenire la path traversal (se il file ZIP contiene path relative come ../)
                if (path.relative(appDataDir, targetPath).startsWith('..')) {
                  console.warn(`Tentativo di path traversal bloccato: ${entry.fileName}`);
                  zipfile.readEntry(); // Passa alla prossima entry
                  return;
                }

                if (entry.fileName === path.basename(calfDataFilePath) ||
                    entry.fileName === path.basename(configFilePath) ||
                    entry.fileName === path.basename(migrationStatusFilePath)) {
                  zipfile.openReadStream(entry, (err, readStream) => {
                    if (err) {
                      console.error(`Errore durante la lettura dell'entry ${entry.fileName}:`, err);
                      return resolve({ success: false, error: `Errore durante la lettura del file ${entry.fileName}: ${err.message}` });
                    }

                    const writeStream = fs.createWriteStream(targetPath);
                    readStream.pipe(writeStream);

                    writeStream.on('finish', () => {
                      console.log(`File estratto: ${entry.fileName} a ${targetPath}`);
                      zipfile.readEntry(); // Continua a leggere la prossima entry
                    });

                    writeStream.on('error', (err) => {
                      console.error(`Errore durante la scrittura del file ${entry.fileName}:`, err);
                      resolve({ success: false, error: `Errore durante la scrittura del file ${entry.fileName}: ${err.message}` });
                    });
                  });
                } else {
                  // Salta le entry non pertinenti
                  zipfile.readEntry();
                }
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
          } else {
            resolve({ success: false, message: 'Importazione annullata.' });
          }
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
