# Svezzamento Vitelli Desktop

![Logo dell'applicazione (se disponibile)](https://example.com/path/to/your/icon.ico) ## Descrizione

**Svezzamento Vitelli Desktop** è un'applicazione desktop progettata per la gestione e il monitoraggio dei dati relativi allo svezzamento dei vitelli. Sviluppata con Electron e React, offre un'interfaccia utente intuitiva per registrare, visualizzare, configurare ed esportare le informazioni cruciali riguardanti i tuoi vitelli.

L'applicazione supporta il salvataggio dei dati su file system, garantendo la persistenza delle informazioni e offrendo funzionalità di backup e ripristino per una gestione sicura dei tuoi registri.

## Caratteristiche Principali

* **Gestione Dati Vitelli:** Registra e gestisci facilmente le informazioni dettagliate per ogni vitello.
* **Impostazioni Personalizzabili:** Configura impostazioni globali e specifiche per ogni vitello per adattare l'applicazione alle tue esigenze.
* **Esportazione Dati:**
    * Esporta i dati dei vitelli in formato **PDF** per report stampabili e facilmente condivisibili.
    * Esporta i dati in formato **Excel (XLSX)** per analisi approfondite e integrazione con altri strumenti.
* **Importazione/Esportazione Dati Completa:**
    * Esporta tutti i dati dell'applicazione (vitelli e configurazione) in un file **ZIP** per backup completi.
    * Importa i dati da file **ZIP** o **JSON**, facilitando la migrazione o il ripristino dei dati.
* **Persistenza Dati:** I dati vengono salvati localmente sul file system dell'utente.
* **Interfaccia Intuitiva:** Sviluppata con React, offre un'esperienza utente moderna e reattiva.

## Tecnologie Utilizzate

* **Electron:** Per la creazione dell'applicazione desktop multipiattaforma.
* **React:** Per la costruzione dell'interfaccia utente.
* **Tailwind CSS:** Per uno styling rapido e responsivo.
* **jsPDF & jspdf-autotable:** Per la generazione di report PDF.
* **SheetJS (xlsx):** Per l'esportazione dei dati in formato Excel.
* **Archiver & Yauzl:** Per la gestione dell'archiviazione e decompressione di file ZIP.
* **Node.js:** Per le operazioni di back-end e file system nel processo principale di Electron.

## Installazione

L'installazione di **Svezzamento Vitelli Desktop** è semplice e diretta grazie alla disponibilità di un eseguibile pre-compilato.

1.  **Scarica la Release:**
    Visita la pagina delle [Release su GitHub](https://github.com/Mattia-1998/svezzamento-desktop/releases) e scarica il file `.exe` più recente (es. `Svezzamento-Vitelli-Setup-X.Y.Z.exe` per Windows).

2.  **Esegui il Programma di Installazione:**
    Una volta scaricato, fai doppio click sul file `.exe` e segui le istruzioni a schermo per completare l'installazione.

Dopo l'installazione, troverai l'applicazione nel tuo menu Start e/o sul tuo desktop.

### Per Sviluppatori (Esecuzione da Sorgente)

Se intendi contribuire allo sviluppo o modificare il codice, puoi avviare l'applicazione dai sorgenti:

1.  **Clona il repository:**
    ```bash
    git clone [URL_DEL_TUO_REPOSITORY]
    cd svezzamento-desktop
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```
3.  **Avvia l'applicazione in modalità di sviluppo:**
    ```bash
    npm start
    ```
4.  **Build per la Distribuzione (Opzionale):**
    Per creare una versione distribuibile per Windows (utile per testare la build):
    ```bash
    npm run build:windows
    ```
    L'output della build sarà disponibile nella directory `build-output`.

## Utilizzo

Apri l'applicazione dal tuo desktop o menu Start. L'interfaccia intuitiva ti guiderà nella gestione dei dati dei vitelli, nell'impostazione delle configurazioni e nell'esportazione dei report.

### Percorsi dei Dati

L'applicazione salva i dati e i file di configurazione nelle seguenti posizioni sul tuo computer (all'interno della directory "Documenti" del tuo utente):

* **Dati dell'applicazione:** `[Tua Home Directory]/Documents/Svezzamento/config/`
* **Backup:** `[Tua Home Directory]/Documents/Svezzamento/Backup/`

## Copyright e Licenza

Copyright © 2025 Giroldini Mattia. Tutti i diritti riservati.

---