// Funzione di utilità per formattare la data (output in DD/MM/YYYY)
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn('Data non valida fornita, restituisco "Invalid Date". Input:', date);
    return 'Invalid Date'; // Handle invalid date objects gracefully
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Funzione per il parsing di una stringa DD/MM/YYYY in una stringaYYYY-MM-DD per il costruttore Date
const parseDateToYYYYMMDD = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    console.warn('Stringa data non valida o vuota, restituisco null. Input:', dateString);
    return null;
  }
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Basic validation for date parts
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
      console.warn(`Parti della data non valide: Giorno=${day}, Mese=${month}, Anno=${year}. Input originale: ${dateString}`);
      return null; // Indicate invalid parsing
    }

    // Check for valid date object (e.g., Feb 30 should be invalid)
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime()) || date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
        console.warn(`Data non valida dopo il parsing (es. 30/02): ${dateString}. Oggetto Date creato: ${date}`);
        return null; // Indicate invalid date (e.g., Feb 30)
    }

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  console.warn(`Formato data non valido (atteso DD/MM/YYYY): ${dateString}`);
  return null; // Indicate invalid format
};


// Durata totale dello svezzamento in giorni (12 settimane)
const DURATA_SVEZZAMENTO_GIORNI = 12 * 7;

// Componente ToggleSwitch
const ToggleSwitch = ({ checked, onChange, label }) => {
  return React.createElement(
    "div",
    { className: "flex items-center space-x-2" },
    React.createElement("span", { className: "text-gray-300 text-sm" }, label), // Changed to dark mode text
    React.createElement(
      "label",
      { htmlFor: label.replace(/\s/g, '-') + "-toggle-switch", className: "flex items-center cursor-pointer" }, // Unique ID
      React.createElement(
        "div",
        { className: "relative" },
        React.createElement("input", {
          type: "checkbox",
          id: label.replace(/\s/g, '-') + "-toggle-switch", // Unique ID
          className: "sr-only",
          checked: checked,
          onChange: onChange,
        }),
        React.createElement("div", {
          className: `block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? "bg-green-500" : "bg-gray-400"
          }`,
        }),
        React.createElement("div", {
          className: `dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`,
        })
      )
    )
  );
};

// Componente Modale generico
// Aggiunto prop 'maxWidthClass' per controllare la larghezza della modale
const Modal = ({ show, onClose, title, children, maxWidthClass = 'max-w-4xl' }) => {
  if (!show) return null;

  return React.createElement(
    "div",
    { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" },
    React.createElement(
      "div",
      { className: `bg-gray-700 rounded-lg shadow-xl p-6 w-full ${maxWidthClass} max-h-[90vh] flex flex-col` }, // Changed to dark mode background
      React.createElement(
        "div",
        { className: "flex justify-between items-center border-b pb-3 mb-4" },
        React.createElement("h2", { className: "text-xl font-semibold text-gray-100" }, title), // Changed to dark mode text
        React.createElement(
          "button",
          { onClick: onClose, className: "text-gray-300 hover:text-gray-100" }, // Changed to dark mode text
          "\xD7"
        )
      ),
      React.createElement("div", { className: "flex-grow overflow-y-auto" }, children),
      React.createElement(
        "div",
        { className: "mt-4 flex justify-end" },
        React.createElement(
          "button",
          {
            onClick: onClose,
            className:
              "px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500", // Changed to dark mode button
          },
          "Chiudi"
        )
      )
    )
  );
};

// --- Inizio Definizione Componenti SVG per le Icone ---
const PlusIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M12 5V19M5 12H19" })
  );

const RefreshCcwIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.79 2.91L3 8" }),
    React.createElement("path", { d: "M3 3v5h5" }),
    React.createElement("path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.79-2.91L21 16" }),
    React.createElement("path", { d: "M21 21v-5h-5" })
  );

const Trash2Icon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
    React.createElement("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
    React.createElement("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
    React.createElement("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
  );

const SortAscIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M3 10h18" }),
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M3 14h18" }),
    React.createElement("path", { d: "M3 18h18" }),
    React.createElement("path", { d: "M10 4L7 1V4H4L7 1H10Z" })
  );

const SortDescIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M3 10h18" }),
    React.createElement("path", { d: "M3 14h18" }),
    React.createElement("path", { d: "M3 18h18" }),
    React.createElement("path", { d: "M10 20L7 23V20H4L7 23H10Z" })
  );

const FileTextIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }),
    React.createElement("polyline", { points: "14 2 14 8 20 8" }),
    React.createElement("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
    React.createElement("line", { x1: "16", y1: "17", x2: "8", y2: "17" }),
    React.createElement("line", { x1: "10", y1: "9", x2: "8", y2: "9" })
  );

const PrinterIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("polyline", { points: "6 9 6 2 18 2 18 9" }),
    React.createElement("path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }),
    React.createElement("rect", { x: "6", y: "14", width: "12", height: "8" })
  );

const FileSpreadsheetIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L15 2z" }),
    React.createElement("polyline", { points: "14 2 14 8 20 8" }),
    React.createElement("path", { d: "M4 10h16" }),
    React.createElement("path", { d: "M10 14h4" }),
    React.createElement("path", { d: "M10 18h4" })
  );

const HardDriveIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("line", { x1: "22", y1: "12", x2: "2", y2: "12" }),
    React.createElement("path", { d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }),
    React.createElement("line", { x1: "6", y1: "16", x2: "6.01", y2: "16" }),
    React.createElement("line", { x1: "10", y1: "16", x2: "10.01", y2: "16" })
  );

const SettingsIcon = ({ size = 24, className = "" }) =>
  React.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: className,
    },
    React.createElement("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.28a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.44a2 2 0 0 1-2 2v.18a2 2 0 0 0-1 1.73l-.43.25a2 2 0 0 0 .73 2.73l.78 1.28a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 1-1.73v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l-.43-.25a2 2 0 0 1 2 0l-.15.08a2 2 0  0 0 2.73-.73l.78-1.28a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.44a2 2 0 0 0 2-2v-.18a2 2 0 0 0-1-1.73l-.43-.25a2 2 0 0 1-2 0l-.15.08a2 2 0 0 0-2.73-.73l-.78-1.28a2 2 0 0 0-.73-2.73l.15-.08a2 2 0 0 1-1-1.73V2z" }),
    React.createElement("circle", { cx: "12", cy: "12", r: "3" })
  );
// --- Fine Definizione Componenti SVG per le Icone ---


// Componente per la finestra Dettagli Vitello
const CalfDetailModal = ({ show, onClose, calfData, globalConfig, exportToPdf, exportToXlsx }) => {
  const [scheduleData, setScheduleData] = React.useState([]);

  React.useEffect(() => {
    if (calfData) {
      const isCowMilk = calfData.milk_type === 'cow_milk';
      if (isCowMilk) {
        // For cow milk, calculate directly from dose_kg (which now stores liters)
        const dNascitaStr = calfData.data_nascita;
        if (dNascitaStr) {
          try {
            const dataNascitaYYYYMMDD = parseDateToYYYYMMDD(dNascitaStr);
            if (!dataNascitaYYYYMMDD) {
                throw new Error("Invalid date format for calculation");
            }
            const dataNascitaDt = new Date(dataNascitaYYYYMMDD);
            if (isNaN(dataNascitaDt.getTime())) {
                throw new Error("Invalid date object after parsing");
            }

            const configToUse = calfData.individual_config && calfData.individual_config.length > 0
                           ? calfData.individual_config
                           : globalConfig.latte_settimanale;

            const calculatedSchedule = configToUse.map((item) => {
              const settimanaIdx = item.settimana - 1;
              const dataInizioSettimana = new Date(dataNascitaDt);
              dataInizioSettimana.setDate(dataNascitaDt.getDate() + settimanaIdx * 7);
              const dataFineSettimana = new Date(dataInizioSettimana);
              dataFineSettimana.setDate(dataInizioSettimana.getDate() + 6);

              const latteGiornalieroLitri = (item.dose_kg || 0) / 7; // dose_kg now means weekly cow milk liters
              const pasti = item.pasti || 2;
              const lattePerPasto = pasti > 0 ? latteGiornalieroLitri / pasti : 0;

              return {
                settimana: item.settimana,
                dataInizio: formatDate(dataInizioSettimana),
                dataFine: formatDate(dataFineSettimana),
                latteGiornaliero: latteGiornalieroLitri,
                acquaGiornaliera: 0, // Always 0 for cow milk
                polvereGiornaliera: 0, // Always 0 for cow milk
                lattePerPasto: lattePerPasto,
                acquaPerPasto: 0, // Always 0 for cow milk
                polverePerPasto: 0, // Always 0 for cow milk
                pasti: pasti,
                concentrazione: 'N/A', // Not applicable for cow milk
              };
            });
            setScheduleData(calculatedSchedule);

          } catch (e) {
            console.error("Errore nel calcolo del programma di svezzamento (Latte Vacca):", e);
            setScheduleData([{ error: "Formato data non valido per il calcolo dello svezzamento." }]);
          }
        } else {
            setScheduleData([{ error: "Data di nascita mancante per il calcolo dello svezzamento." }]);
        }
        return;
      }

      // Logic for powdered milk (existing logic)
      const configToUse = calfData.individual_config && calfData.individual_config.length > 0
                           ? calfData.individual_config
                           : globalConfig.latte_settimanale;

      if (configToUse && configToUse.length > 0) {
        const dNascitaStr = calfData.data_nascita; // This should be DD/MM/YYYY
        if (dNascitaStr) {
          try {
            const dataNascitaYYYYMMDD = parseDateToYYYYMMDD(dNascitaStr);
            if (!dataNascitaYYYYMMDD) {
                throw new Error("Invalid date format for calculation");
            }
            const dataNascitaDt = new Date(dataNascitaYYYYMMDD); // ParseYYYY-MM-DD
            if (isNaN(dataNascitaDt.getTime())) {
                throw new Error("Invalid date object after parsing");
            }

            const calculatedSchedule = configToUse.map((item) => {
              const settimanaIdx = item.settimana - 1;
              const dataInizioSettimana = new Date(dataNascitaDt);
              dataInizioSettimana.setDate(dataNascitaDt.getDate() + settimanaIdx * 7);
              const dataFineSettimana = new Date(dataInizioSettimana);
              dataFineSettimana.setDate(dataInizioSettimana.getDate() + 6);

              const doseKgSettimanale = item.dose_kg || 0;
              const pasti = item.pasti || 2;
              const concentrazionePercentuale = item.concentrazione_percentuale || 10.0;

              const polvereGiornaliera = doseKgSettimanale / 7;
              const latteGiornalieroLitri = polvereGiornaliera * (100 / concentrazionePercentuale);
              const acquaGiornalieraLitri = latteGiornalieroLitri - polvereGiornaliera;

              const lattePerPasto = pasti > 0 ? latteGiornalieroLitri / pasti : 0;
              const acquaPerPasto = pasti > 0 ? acquaGiornalieraLitri / pasti : 0;
              const polverePerPasto = pasti > 0 ? polvereGiornaliera / pasti : 0;

              return {
                settimana: item.settimana,
                dataInizio: formatDate(dataInizioSettimana),
                dataFine: formatDate(dataFineSettimana),
                latteGiornaliero: latteGiornalieroLitri,
                acquaGiornaliera: acquaGiornalieraLitri,
                polvereGiornaliera: polvereGiornaliera,
                lattePerPasto: lattePerPasto,
                acquaPerPasto: acquaPerPasto,
                polverePerPasto: polverePerPasto,
                pasti: pasti,
                concentrazione: concentrazionePercentuale,
              };
            });
            setScheduleData(calculatedSchedule);
          } catch (e) {
            console.error("Errore nel calcolo del programma di svezzamento (Latte Polvere):", e);
            setScheduleData([{ error: "Formato data non valido per il calcolo dello svezzamento." }]);
          }
        } else {
          setScheduleData([{ error: "Data di nascita mancante per il calcolo dello svezzamento." }]);
        }
      } else {
        setScheduleData([{ error: "Nessuna configurazione di svezzamento disponibile." }]);
      }
    }
  }, [calfData, globalConfig.latte_settimanale]); // Dipende da calfData e globalConfig.latte_settimanale

  const currentCalfDetails = calfData?.calculated_details || {};
  const giorniMancantiText = currentCalfDetails.giorni_mancanti_text || 'N/A';
  const isCowMilkDisplay = calfData?.milk_type === 'cow_milk';

  const handleExportXlsx = () => {
    exportToXlsx(calfData, scheduleData, true); // True per indicare singolo vitello
  };

  return React.createElement(
    Modal,
    // Modificato maxWidthClass per rendere la modale più larga
    { show: show, onClose: onClose, title: `Programma Svezzamento: ${calfData?.matricola || ''}`, maxWidthClass: 'max-w-7xl' },
    React.createElement(
      "div",
      { className: "flex flex-col space-y-4 text-gray-100" }, // Changed to dark mode text
      React.createElement(
        "div",
        { className: "flex justify-end space-x-2" },
        React.createElement(
          "button",
          {
            onClick: () => exportToPdf(calfData, scheduleData, true),
            className: "flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200",
          },
          React.createElement(FileTextIcon, { size: 18, className: "mr-1" }),
          " Salva PDF"
        ),
        React.createElement(
          "button",
          {
            onClick: handleExportXlsx,
            className: "flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200",
          },
          React.createElement(FileSpreadsheetIcon, { size: 18, className: "mr-1" }),
          " Esporta in Excel"
        )
      ),
      React.createElement("p", { className: "font-semibold" }, "Data di Nascita: ", calfData?.data_nascita || 'N/A'),
      React.createElement("p", { className: "font-semibold" }, "Giorni allo Svezzamento: ", giorniMancantiText),
      isCowMilkDisplay && React.createElement("p", { className: "text-lg font-semibold mt-4 text-red-400" }, "Modalità: Latte Vacca"), // Changed to dark mode text
      React.createElement("h3", { className: "text-lg font-semibold mt-4" }, "Programma Svezzamento Settimanale:"),
      React.createElement(
        "div",
        { className: "overflow-x-auto" },
        React.createElement(
          "table",
          { className: "min-w-full bg-gray-800 border border-gray-600 rounded-md text-sm" }, // Changed to dark mode background and border
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { className: "bg-gray-700" }, // Changed to dark mode background
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Settimana"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Data Inizio"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Data Fine"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Dose Latte/G (L)"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua / G."),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Polvere di latte / G."),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte / pasto"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua / pasto"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Polvere di latte / Pasto"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Pasti/G"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Concentrazione (%)")
            )
          ),
          React.createElement(
            "tbody",
            null,
            scheduleData.length > 0
              ? scheduleData.map((row, index) =>
                  React.createElement(
                    "tr",
                    { key: index, className: "border-b border-gray-600" }, // Changed to dark mode border
                    row.error
                      ? React.createElement("td", { colSpan: "11", className: "py-2 px-3 text-center text-red-600" }, row.error)
                      : React.createElement(
                          React.Fragment,
                          null,
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.settimana),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.dataInizio),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.dataFine),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.latteGiornaliero.toFixed(2)),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.acquaGiornaliera.toFixed(2)),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.polvereGiornaliera.toFixed(2)),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.lattePerPasto.toFixed(2)),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.acquaPerPasto.toFixed(2)),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.polverePerPasto.toFixed(2)),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, row.pasti),
                          React.createElement("td", { className: "py-2 px-3 text-center" }, typeof row.concentrazione === 'number' ? `${row.concentrazione.toFixed(1)}%` : row.concentrazione)
                        )
                  )
                )
              : React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "td",
                    { colSpan: "11", className: "py-4 text-center text-gray-500" },
                    "Nessun programma di svezzamento disponibile."
                  )
                )
          )
        )
      )
    )
  );
};


// Componente per la finestra delle impostazioni globali
const GlobalSettingsModal = ({ show, onClose, config, onSaveSettings }) => {
  const [settings, setSettings] = React.useState([]);

  React.useEffect(() => {
    if (config.latte_settimanale) {
      setSettings(
        config.latte_settimanale.map((item) => {
          // Ensure these calculations result in valid numbers
          const initialDailyPowderKg = item.dose_kg / 7;
          const initialDailyLiters = initialDailyPowderKg * (100 / (item.concentrazione_percentuale || 10.0));
          return {
            ...item,
            // Convert to string for text input, handle potential NaN
            litri_giorno_input: isNaN(initialDailyLiters) ? '0.00' : initialDailyLiters.toFixed(2),
            pasti: String(item.pasti || 1),
            concentrazione_percentuale: isNaN(item.concentrazione_percentuale) ? '10.0' : item.concentrazione_percentuale.toFixed(1),
          };
        })
      );
    }
  }, [config.latte_settimanale]);

  const updateSettingField = (index, field, value) => {
    setSettings((prevSettings) =>
      prevSettings.map((item, i) => {
        if (i === index) {
          let parsedValue = parseFloat(value);
          if (isNaN(parsedValue) || parsedValue < 0) {
            parsedValue = 0; // Default to 0 for non-numeric or negative input
          }

          if (field === "pasti") {
            // Ensure 'pasti' is an integer and at least 1
            let parsedPasti = parseInt(value);
            if (isNaN(parsedPasti) || parsedPasti < 1) {
              parsedPasti = 1;
            }
            return { ...item, [field]: String(parsedPasti) }; // Store as string for text input
          } else if (field === "concentrazione_percentuale") {
            return { ...item, [field]: parsedValue.toFixed(1) }; // Store as string with one decimal
          } else { // litri_giorno_input
            return { ...item, [field]: parsedValue.toFixed(2) }; // Store as string with two decimals
          }
        }
        return item;
      })
    );
  };

  const calculateRowDetails = (item) => {
    // Parse values from string inputs back to numbers for calculation
    const litriGiornalieri = parseFloat(item.litri_giorno_input) || 0;
    const pasti = parseInt(item.pasti) || 1;
    const concentrazione = parseFloat(item.concentrazione_percentuale) || 10.0;

    const polvereGiornaliera = litriGiornalieri * (concentrazione / 100);
    const acquaGiornaliera = litriGiornalieri - polvereGiornaliera;

    const lattePerPasto = pasti > 0 ? litriGiornalieri / pasti : 0;
    const acquaPerPasto = pasti > 0 ? acquaGiornaliera / pasti : 0;
    const polverePerPasto = pasti > 0 ? polvereGiornaliera / pasti : 0;

    return {
      latteGiornaliero: litriGiornalieri,
      acquaGiornaliera: acquaGiornaliera,
      polvereGiornaliera: polvereGiornaliera,
      lattePerPasto: lattePerPasto,
      acquaPerPasto: acquaPerPasto,
      polverePerPasto: polverePerPasto,
    };
  };

  const handleSave = () => {
    const updatedLatteSettimanale = settings.map((item) => {
      const { polvereGiornaliera } = calculateRowDetails(item);
      return {
        settimana: item.settimana,
        dose_kg: polvereGiornaliera * 7, // Converti la dose giornaliera in settimanale per il salvataggio
        descrizione: item.descrizione,
        pasti: parseInt(item.pasti) || 2, // Ensure parsing back to number
        concentrazione_percentuale: parseFloat(item.concentrazione_percentuale) || 10.0, // Ensure parsing back to number
      };
    });
    onSaveSettings(updatedLatteSettimanale);
    onClose();
  };

  return React.createElement(
    Modal,
    // Passa una classe di larghezza maggiore per la modale delle impostazioni
    { show: show, onClose: onClose, title: "Impostazioni Consumo Latte Globali", maxWidthClass: 'max-w-6xl' },
    React.createElement(
      "div",
      { className: "overflow-x-auto mb-4" },
      React.createElement(
        "table",
        { className: "min-w-full bg-gray-800 border border-gray-600 rounded-md text-sm" }, // Changed to dark mode background and border
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { className: "bg-gray-700" }, // Changed to dark mode background
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Settimana"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Litri al Giorno (L)"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Pasti"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Concentrazione (%)"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte Giornaliero"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua al Giorno"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Polvere di latte / Giorno"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte per pasto"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua per Pasto"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Polvere di latte / Pasto")
          )
        ),
        React.createElement(
          "tbody",
          null,
          settings.map((item, index) => {
            const {
              latteGiornaliero,
              acquaGiornaliera,
              polvereGiornaliera,
              lattePerPasto,
              acquaPerPasto,
              polverePerPasto,
            } = calculateRowDetails(item);

            return React.createElement(
              "tr",
              { key: item.settimana, className: "border-b border-gray-600" }, // Changed to dark mode border
              React.createElement("td", { className: "py-2 px-3 text-center" }, "Settimana ", item.settimana),
              React.createElement(
                "td",
                { className: "py-2 px-3 text-center" },
                React.createElement("input", {
                  type: "text", // Changed from number to text
                  className: "w-20 p-1 border rounded text-center bg-gray-600 text-gray-100 appearance-none [appearance:textfield]", // Added Tailwind classes
                  value: item.litri_giorno_input, // Value is now a string
                  onChange: (e) => updateSettingField(index, "litri_giorno_input", e.target.value),
                })
              ),
              React.createElement(
                "td",
                { className: "py-2 px-3 text-center" },
                React.createElement("input", {
                  type: "text", // Changed from number to text
                  className: "w-16 p-1 border rounded text-center bg-gray-600 text-gray-100 appearance-none [appearance:textfield]", // Added Tailwind classes
                  value: item.pasti, // Value is now a string
                  onChange: (e) => updateSettingField(index, "pasti", e.target.value),
                })
              ),
              React.createElement(
                "td",
                { className: "py-2 px-3 text-center" },
                React.createElement("input", {
                  type: "text", // Changed from number to text
                  className: `w-16 p-1 border rounded text-center bg-gray-600 text-gray-100 appearance-none [appearance:textfield]`, // Added Tailwind classes
                  value: item.concentrazione_percentuale, // Value is now a string
                  onChange: (e) => updateSettingField(index, "concentrazione_percentuale", e.target.value),
                })
              ),
              React.createElement("td", { className: "py-2 px-3 text-center" }, latteGiornaliero.toFixed(2), " L"),
              React.createElement("td", { className: "py-2 px-3 text-center" }, acquaGiornaliera.toFixed(2), " L"),
              React.createElement("td", { className: "py-2 px-3 text-center" }, polvereGiornaliera.toFixed(2), " kg"),
              React.createElement("td", { className: "py-2 px-3 text-center" }, lattePerPasto.toFixed(2), " L"),
              React.createElement("td", { className: "py-2 px-3 text-center" }, acquaPerPasto.toFixed(2), " L"),
              React.createElement("td", { className: "py-2 px-3 text-center" }, polverePerPasto.toFixed(2), " kg")
            );
          })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex justify-end space-x-4" },
      React.createElement(
        "button",
        {
          onClick: handleSave,
          className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200",
        },
        "Salva Impostazioni"
      )
    )
  );
};

// Componente per la finestra delle impostazioni specifiche del vitello
const CalfSpecificSettingsModal = ({ show, onClose, calfData, globalConfig, onSaveIndividualCalfSettings, onResetIndividualCalfSettings }) => {
  const [settings, setSettings] = React.useState([]);
  const [currentMilkType, setCurrentMilkType] = React.useState(calfData?.milk_type || 'powdered_milk'); // New state for milk type

  React.useEffect(() => {
    if (calfData) {
      // Set the milk type from calfData, default to 'powdered_milk'
      setCurrentMilkType(calfData.milk_type || 'powdered_milk');

      // Prioritize individual config if available, otherwise use global default
      const configToEdit = calfData.individual_config && calfData.individual_config.length > 0
                           ? calfData.individual_config
                           : globalConfig.latte_settimanale;

      setSettings(
        configToEdit.map((item) => {
          let initialDailyLiters = 0;
          if (calfData.milk_type === 'cow_milk') { // If the calf is set to cow milk
            initialDailyLiters = (item.dose_kg || 0) / 7; // Here, dose_kg represents weekly cow milk liters
          } else { // Default or if powdered milk
            const initialDailyPowderKg = (item.dose_kg || 0) / 7;
            initialDailyLiters = initialDailyPowderKg * (100 / (item.concentrazione_percentuale || 10.0));
          }
          return {
            ...item,
            // Convert to string for text input, handle potential NaN
            litri_giorno_input: isNaN(initialDailyLiters) ? '0.00' : initialDailyLiters.toFixed(2),
            pasti: String(item.pasti || 1),
            concentrazione_percentuale: isNaN(item.concentrazione_percentuale) ? '10.0' : item.concentrazione_percentuale.toFixed(1),
          };
        })
      );
    }
  }, [calfData, globalConfig.latte_settimanale]);

  const updateSettingField = (index, field, value) => {
    setSettings((prevSettings) =>
      prevSettings.map((item, i) => {
        if (i === index) {
          let parsedValue = parseFloat(value);
          if (isNaN(parsedValue) || parsedValue < 0) {
            parsedValue = 0; // Default to 0 for non-numeric or negative input
          }

          if (field === "pasti") {
            // Ensure 'pasti' is an integer and at least 1
            let parsedPasti = parseInt(value);
            if (isNaN(parsedPasti) || parsedPasti < 1) {
              parsedPasti = 1;
            }
            return { ...item, [field]: String(parsedPasti) };
          } else if (field === "concentrazione_percentuale") {
            return { ...item, [field]: parsedValue.toFixed(1) };
          } else { // litri_giorno_input
            return { ...item, [field]: parsedValue.toFixed(2) };
          }
        }
        return item;
      })
    );
  };

  const calculateRowDetails = (item, isCowMilkMode) => {
    if (isCowMilkMode) {
      // For display in the modal when cow milk is active
      const litriGiornalieri = parseFloat(item.litri_giorno_input) || 0;
      const pasti = parseInt(item.pasti) || 1;
      const lattePerPasto = pasti > 0 ? litriGiornalieri / pasti : 0;
      return {
        latteGiornaliero: litriGiornalieri,
        acquaGiornaliera: 0,
        polvereGiornaliera: 0,
        lattePerPasto: lattePerPasto,
        acquaPerPasto: 0,
        polverePerPasto: 0,
      };
    }
    const litriGiornalieri = parseFloat(item.litri_giorno_input) || 0;
    const pasti = parseInt(item.pasti) || 1;
    const concentrazione = parseFloat(item.concentrazione_percentuale) || 10.0;

    const polvereGiornaliera = litriGiornalieri * (concentrazione / 100);
    const acquaGiornaliera = litriGiornalieri - polvereGiornaliera;

    const lattePerPasto = pasti > 0 ? litriGiornalieri / pasti : 0;
    const acquaPerPasto = pasti > 0 ? acquaGiornaliera / pasti : 0;
    const polverePerPasto = pasti > 0 ? polvereGiornaliera / pasti : 0;

    return {
      latteGiornaliero: litriGiornalieri,
      acquaGiornaliera: acquaGiornaliera,
      polvereGiornaliera: polvereGiornaliera,
      lattePerPasto: lattePerPasto,
      acquaPerPasto: acquaPerPasto,
      polverePerPasto: polverePerPasto,
    };
  };

  const handleSave = () => {
    const isCowMilkMode = currentMilkType === 'cow_milk';

    const updatedLatteSettimanale = settings.map((item) => {
      const { polvereGiornaliera } = calculateRowDetails(item, false); // Always calculate powder for saving dose_kg if not cow milk
      const litriGiornalieriInput = parseFloat(item.litri_giorno_input) || 0;

      return {
        settimana: item.settimana,
        // If cow milk, 'dose_kg' will effectively store the total weekly *cow milk liters*.
        // If powdered milk, 'dose_kg' stores the total weekly *powder kg'.
        dose_kg: isCowMilkMode ? litriGiornalieriInput * 7 : polvereGiornaliera * 7, // Direct input for cow milk, weekly
        descrizione: item.descrizione,
        pasti: parseInt(item.pasti) || 2, // Ensure parsing back to number
        concentrazione_percentuale: isCowMilkMode ? 0 : (parseFloat(item.concentrazione_percentuale) || 10.0), // Ensure parsing back to number
      };
    });
    onSaveIndividualCalfSettings(calfData.matricola, updatedLatteSettimanale, currentMilkType);
    onClose();
  };

  const handleReset = () => {
    // Custom confirmation dialog
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
    confirmDialog.innerHTML = `
      <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
        <h3 class="text-lg font-semibold mb-4">Conferma Ripristino Impostazioni</h3>
        <p class="mb-6">Sei sicuro di voler ripristinare le impostazioni per il vitello ${calfData.matricola} ai valori predefiniti globali?</p>
        <div class="flex justify-end space-x-4">
          <button id="cancelReset" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Annulla</button>
          <button id="confirmReset" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Conferma Ripristino</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmDialog);

    document.getElementById('cancelReset').onclick = () => {
      document.body.removeChild(confirmDialog);
    };

    document.getElementById('confirmReset').onclick = () => {
      document.body.removeChild(confirmDialog);
      onResetIndividualCalfSettings(calfData.matricola);
      setCurrentMilkType('powdered_milk'); // Reset milk type to default
      onClose();
    };
  };

  const isCowMilkModeActive = currentMilkType === 'cow_milk';

  // Determine if current settings are the same as global defaults
  const isUsingGlobalDefaults = React.useMemo(() => {
    if (!calfData || !globalConfig.latte_settimanale) return false;
    if (isCowMilkModeActive) return false; // If cow milk mode is active, it's not using global powdered milk defaults

    const currentConfig = settings.map(item => {
      const litri_giorno_input = parseFloat(item.litri_giorno_input) || 0;
      const concentrazione_percentuale = parseFloat(item.concentrazione_percentuale) || 10.0;
      const pasti = parseInt(item.pasti) || 2;

      let dose_kg_calculated_for_comparison;
      // This calculation is for comparing with global config, which stores dose_kg as powder kg
      dose_kg_calculated_for_comparison = (litri_giorno_input * (concentrazione_percentuale / 100)) * 7; // Weekly powder kg

      return {
        settimana: item.settimana,
        dose_kg: dose_kg_calculated_for_comparison,
        pasti: pasti,
        concentrazione_percentuale: concentrazione_percentuale,
      };
    });

    if (currentConfig.length !== globalConfig.latte_settimanale.length) return false;

    for (let i = 0; i < currentConfig.length; i++) {
      const globalItem = globalConfig.latte_settimanale[i];
      const currentItem = currentConfig[i];

      if (
        currentItem.settimana !== globalItem.settimana ||
        Math.abs(currentItem.dose_kg - globalItem.dose_kg) > 0.01 ||
        currentItem.pasti !== globalItem.pasti ||
        Math.abs(currentItem.concentrazione_percentuale - globalItem.concentrazione_percentuale) > 0.01
      ) {
        return false;
      }
    }
    return true;

  }, [settings, globalConfig.latte_settimanale, calfData, isCowMilkModeActive]);


  return React.createElement(
    Modal,
    { show: show, onClose: onClose, title: `Impostazioni Individuali per Vitello: ${calfData?.matricola || ''}`, maxWidthClass: 'max-w-6xl' },
    React.createElement(
      "div",
      { className: "flex flex-col space-y-4 mb-4" },
      React.createElement(ToggleSwitch, {
        label: isCowMilkModeActive ? "Modalità: Latte Vacca" : "Modalità: Latte in Polvere",
        checked: isCowMilkModeActive,
        onChange: (e) => setCurrentMilkType(e.target.checked ? 'cow_milk' : 'powdered_milk'),
      }),
      isCowMilkModeActive && React.createElement(
        "p",
        { className: "text-orange-300 text-sm italic" }, // Changed to dark mode text
        "Quando la modalità 'Latte Vacca' è attiva, i campi 'Acqua', 'Polvere' e 'Concentrazione' sono disabilitati. Il valore 'Litri al Giorno' rappresenta direttamente i litri di latte vaccino da somministrare."
      )
    ),
    React.createElement(
      "div",
      { className: "overflow-x-auto mb-4" },
      React.createElement(
        "table",
        { className: "min-w-full bg-gray-800 border border-gray-600 rounded-md text-sm" }, // Changed to dark mode background and border
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { className: "bg-gray-700" }, // Changed to dark mode background
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Settimana"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Data Inizio"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Data Fine"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Dose Latte/G (L)"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Acqua / G."),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Polvere di latte / G."),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Latte / pasto"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Acqua / pasto"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Polvere di latte / Pasto"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Pasti/G"),
            React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Concentrazione (%)")
          )
        ),
        React.createElement(
          "tbody",
          null,
          settings.map((item, index) => {
            const {
              latteGiornaliero,
              acquaGiornaliera,
              polvereGiornaliera,
              lattePerPasto,
              acquaPerPasto,
              polverePerPasto,
            } = calculateRowDetails(item);

            return React.createElement(
              "tr",
              { key: item.settimana, className: "border-b border-gray-600" }, // Changed to dark mode border
              React.createElement("td", { className: "py-3 px-4" }, item.settimana),
              React.createElement("td", { className: "py-3 px-4" }, React.createElement("input", {
                type: "text",
                className: "w-full bg-transparent border-none focus:outline-none text-gray-100", // Set default dark theme colors
                value: item.data_inizio,
                onChange: (e) => updateSettingField(index, "data_inizio", e.target.value),
              })),
              React.createElement("td", { className: "py-3 px-4" }, React.createElement("input", {
                type: "text",
                className: "w-full bg-transparent border-none focus:outline-none text-gray-100", // Set default dark theme colors
                value: item.data_fine,
                onChange: (e) => updateSettingField(index, "data_fine", e.target.value),
              })),
              React.createElement("td", { className: "py-3 px-4" }, latteGiornaliero.toFixed(2)),
              React.createElement("td", { className: "py-3 px-4" }, acquaGiornaliera.toFixed(2)),
              React.createElement("td", { className: "py-3 px-4" }, polvereGiornaliera.toFixed(2)),
              React.createElement("td", { className: "py-3 px-4" }, lattePerPasto.toFixed(2)),
              React.createElement("td", { className: "py-3 px-4" }, acquaPerPasto.toFixed(2)),
              React.createElement("td", { className: "py-3 px-4" }, polverePerPasto.toFixed(2)),
              React.createElement("td", { className: "py-3 px-4" }, item.pasti),
              React.createElement("td", { className: "py-3 px-4" }, typeof item.concentrazione_percentuale === 'number' ? `${item.concentrazione_percentuale.toFixed(1)}%` : item.concentrazione_percentuale)
            );
          })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "flex justify-end space-x-4" },
      React.createElement(
        "button",
        {
          onClick: handleSave,
          className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200",
        },
        "Salva Impostazioni"
      )
    )
  );
};

// Funzione per ottenere la versione dal backend (Electron preload)
function useAppVersion() {
  const [version, setVersion] = React.useState('');
  React.useEffect(() => {
    if (window && window.electronAPI && window.electronAPI.getAppVersion) {
      window.electronAPI.getAppVersion().then(setVersion);
    } else {
      // fallback: mostra "?" se non disponibile
      setVersion('?');
    }
  }, []);
  return version;
}

// Modale Info Programma
const AboutModal = ({ onClose }) => {
  const version = useAppVersion();
  return React.createElement(
    "div",
    { className: "fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]" },
    React.createElement(
      "div",
      { className: "bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100" },
      React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Info Programma"),
      React.createElement("p", null, React.createElement("b", null, "Nome:"), " Svezzamento Desktop"),
      React.createElement("p", null, React.createElement("b", null, "Versione:"), ` ${version}`),
      React.createElement("p", null, React.createElement("b", null, "Creatore:"), " Giroldini Mattia"),
      React.createElement("p", null, React.createElement("b", null, "Contatti:"), " mattia.giroldini1998@gmail.com"),
      React.createElement(
        "button",
        { onClick: onClose, className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" },
        "Chiudi"
      )
    )
  );
};

// Main App Component
const App = () => {
  // vitelliRawData: Stores only the raw user input (matricola, data_nascita) for persistence
  // Now also includes an optional 'individual_config' array for each calf
  const [vitelliRawData, setVitelliRawData] = React.useState([]);
  const [config, setConfig] = React.useState({
    latte_settimanale: [], // Global default settings
  });
  const [newMatricola, setNewMatricola] = React.useState('');
  const [newDataNascita, setNewDataNascita] = React.useState('');
  const [showGlobalSettingsModal, setShowGlobalSettingsModal] = React.useState(false);
  const [showCalfDetailModal, setShowCalfDetailModal] = React.useState(false);
  const [showCalfSpecificSettingsModal, setShowCalfSpecificSettingsModal] = React.useState(false);
  const [selectedCalf, setSelectedCalf] = React.useState(null);
  const [showImportExportModal, setShowImportExportModal] = React.useState(false);
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [currentClock, setCurrentClock] = React.useState('');

  // vitelliDisplayedData: Derived state that includes calculated details for display
  const [vitelliDisplayedData, setVitelliDisplayedData] = React.useState([]);
  const [totals, setTotals] = React.useState({
    latte: 0, // Total daily liquid milk (powder reconstituted OR cow milk)
    acqua: 0, // Total daily water for powder reconstitution
    polvere: 0, // Total daily powder
    lattePasto: 0, // Total per-feeding liquid milk
    acquaPasto: 0, // Total per-feeding water for powder reconstitution
    polverePastoTotal: 0 // Total per-feeding powder
  });
  const [totalKgWeaningFromToday, setTotalKgWeaningFromToday] = React.useState(0);


  // PDF Export Function (using jsPDF)
  const exportDataToPdf = (dataToExport, schedule = null, isSingleCalf = false) => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      // Replaced alert with custom modal
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Libreria</h3>
          <p class="mb-6">La libreria jsPDF non è caricata. Impossibile esportare in PDF.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
      return;
    }
    const { jsPDF } = window.jspdf;
    // Set orientation to landscape for both single and all calves PDF
    const doc = new jsPDF('landscape', 'mm', 'a4');
    doc.setFont("helvetica"); // Default font

    const headerStyle = {
      fillColor: isSingleCalf ? [211, 211, 211] : [169, 169, 169], // D3D3D3 or A9A9A9
      textColor: isSingleCalf ? [0, 0, 0] : [255, 255, 255], // Black or White
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
    };
    const bodyStyle = {
      fillColor: isSingleCalf ? [255, 255, 255] : [245, 245, 220], // White or F5F5DC
      textColor: [0, 0, 0], // Black
      halign: 'center',
      valign: 'middle',
    };

    if (isSingleCalf && dataToExport && schedule) {
      // Single Calf PDF
      doc.setFontSize(18);
      doc.text(`Programma Svezzamento Vitello: ${dataToExport.matricola}`, doc.internal.pageSize.width / 2, 20, { align: 'center' }); // Adjusted Y position
      doc.setFontSize(12);
      doc.text(`Matricola: ${dataToExport.matricola}`, 20, 35); // Adjusted X, Y position
      doc.text(`Data di Nascita: ${dataToExport.data_nascita}`, 20, 45); // Adjusted X, Y position
      doc.text(`Tipo di Latte: ${dataToExport.milk_type === 'cow_milk' ? 'Latte Vacca' : 'Latte in Polvere'}`, 20, 55); // Adjusted X, Y position
      doc.text(`Giorni allo Svezzamento: ${dataToExport.calculated_details.giorni_mancanti_text || 'N/A'}`, 20, 65); // Adjusted X, Y position
      doc.text("Programma Svezzamento Settimanale:", 20, 80); // Adjusted X, Y position

      const scheduleHeaders = [
        ["Settimana", "Data Inizio", "Data Fine", "Dose Latte/G (L)", "Acqua / G.", "Polvere di latte / G.", "Latte / pasto", "Acqua / pasto", "Polvere / Pasto", "Pasti/G", "Concentrazione (%)"]
      ];
      const scheduleBody = schedule.map(row => [
        row.settimana,
        row.dataInizio,
        row.dataFine,
        row.latteGiornaliero.toFixed(2),
        row.acquaGiornaliera.toFixed(2),
        row.polvereGiornaliera.toFixed(2),
        row.lattePerPasto.toFixed(2),
        row.acquaPerPasto.toFixed(2),
        row.polverePerPasto.toFixed(2),
        row.pasti,
        typeof row.concentrazione === 'number' ? `${row.concentrazione.toFixed(1)}%` : row.concentrazione,
      ]);

      doc.autoTable({
        startY: 90, // Adjusted startY
        head: scheduleHeaders,
        body: scheduleBody,
        theme: 'grid',
        headStyles: headerStyle,
        bodyStyles: bodyStyle,
        styles: { fontSize: 8, cellPadding: 2 }, // Reduced font size and padding
        columnStyles: {
          0: { cellWidth: 18 }, // Settimana
          1: { cellWidth: 25 }, // Data Inizio
          2: { cellWidth: 25 }, // Data Fine
          3: { cellWidth: 25 }, // Dose Latte/G (L)
          4: { cellWidth: 25 }, // Acqua / G.
          5: { cellWidth: 25 }, // Polvere di latte / G.
          6: { cellWidth: 25 }, // Latte / pasto
          7: { cellWidth: 25 }, // Acqua / pasto
          8: { cellWidth: 25 }, // Polvere / Pasto
          9: { cellWidth: 18 }, // Pasti/G
          10: { cellWidth: 25 }, // Concentrazione (%)
        },
      });

      doc.save(`Svezzamento_${dataToExport.matricola}.pdf`);
      // Replaced alert with custom modal
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      successModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Esportazione PDF Completata</h3>
          <p class="mb-6">PDF salvato con successo</p>
          <div class="flex justify-end">
            <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(successModal);
      document.getElementById('closeSuccessModal').onclick = () => {
        document.body.removeChild(successModal);
      };

    } else {
      // All Calves PDF
      doc.setFontSize(18);
      doc.text("Dati Vitelli e Programma di Svezzamento", doc.internal.pageSize.width / 2, 20, { align: 'center' }); // Adjusted Y position
      doc.setFontSize(12);
      doc.text(`Dosi Totali Giornaliere:`, 20, 35); // Adjusted X, Y position
      doc.text(totals.latte.toFixed(2) + " L", 30, 45); // Adjusted X, Y position
      doc.text(totals.acqua.toFixed(2) + " L", 30, 55); // Adjusted X, Y position
      doc.text(totals.polvere.toFixed(2) + " kg", 30, 65); // Adjusted X, Y position

      doc.text(`Dosi Totali per Pasto:`, 20, 75); // Adjusted X, Y position
      doc.text(totals.lattePasto.toFixed(2) + " L", 30, 85); // Adjusted X, Y position
      doc.text(totals.acquaPasto.toFixed(2) + " L", 30, 95); // Adjusted X, Y position
      doc.text(totals.polverePastoTotal.toFixed(2) + " kg (per pasto in media)", 30, 105); // Adjusted X, Y position
      doc.text(`Totale kg polvere di latte necessaria da oggi: ${totalKgWeaningFromToday.toFixed(2)} kg`, 20, 120); // Adjusted X, Y position


      const headers = [
        ["Matricola", "Data di Nascita", "Tipo Latte", "Da -> A", "Dose Totale Giornaliera", "Dose Acqua Giornaliera", "Dose Polvere Giornaliera", "Dose per Pasto", "Dose Acqua per Pasto", "Dose Polvere per Pasto", "Giorni allo Svezzamento"]
      ];
      const body = vitelliDisplayedData.map(calf => [ // Use vitelliDisplayedData here
        calf.matricola,
        calf.data_nascita,
        calf.milk_type === 'cow_milk' ? 'Vacca' : 'Polvere', // Display milk type in table
        calf.calculated_details.dates_range_text || '',
        calf.calculated_details.latte_giornaliero.toFixed(2) + " L",
        calf.calculated_details.acqua_giornaliera.toFixed(2) + " L",
        calf.calculated_details.polvere_giornaliera.toFixed(2) + " kg",
        calf.calculated_details.latte_per_pasto.toFixed(2) + " L",
        calf.calculated_details.acqua_per_pasto.toFixed(2) + " L",
        calf.calculated_details.polvere_per_pasto.toFixed(2) + " kg",
        calf.calculated_details.giorni_mancanti_text || ''
      ]);

      doc.autoTable({
        startY: 130, // Adjusted startY
        head: headers,
        body: body,
        theme: 'grid',
        headStyles: headerStyle,
        bodyStyles: bodyStyle,
        styles: { fontSize: 7, cellPadding: 1.5 }, // Reduced font size and padding
        columnStyles: {
          0: { cellWidth: 25 }, // Matricola
          1: { cellWidth: 25 }, // Data di Nascita
          2: { cellWidth:  20 }, // Tipo Latte
          3: { cellWidth: 35 }, // Da -> A
          4: { cellWidth: 25 }, // Dose Totale Giornaliera
          5: { cellWidth: 25 }, // Dose Acqua Giornaliera
          6: { cellWidth: 25 }, // Dose Polvere Giornaliera
          7: { cellWidth: 25 }, // Dose per Pasto
          8: { cellWidth: 25 }, // Dose Acqua per Pasto
          9: { cellWidth: 25 }, // Dose Polvere per Pasto
          10: { cellWidth: 25 }, // Giorni allo Svezzamento
        },
      });

      doc.save("Dati_Vitelli_Svezzamento.pdf");
      // Replaced alert with custom modal
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      successModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Esportazione PDF Completata</h3>
          <p class="mb-6">Dati salvati con successo</p>
          <div class="flex justify-end">
            <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(successModal);
      document.getElementById('closeSuccessModal').onclick = () => {
        document.body.removeChild(successModal);
      };
    }
  };

  // Excel Export Function (using SheetJS)
  const exportToXlsx = (dataToExport, schedule = null, isSingleCalf = false) => {
    if (!window.XLSX) {
      // Replaced alert with custom modal
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Libreria</h3>
          <p class="mb-6">La libreria XLSX non è caricata. Impossibile esportare in Excel.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
      return;
    }

    const wb = window.XLSX.utils.book_new();

    if (isSingleCalf && dataToExport && schedule) {
      // Single Calf Excel
      const ws_data = [
        [`Programma Svezzamento Vitello: ${dataToExport.matricola}`],
        [],
        ["Matricola:", dataToExport.matricola],
        ["Data di Nascita:", dataToExport.data_nascita],
        ["Tipo di Latte:", dataToExport.milk_type === 'cow_milk' ? 'Latte Vacca' : 'Latte in Polvere'],
        ["Giorni allo Svezzamento:", dataToExport.calculated_details.giorni_mancanti_text || 'N/A'],
        [],
        ["Programma Svezzamento Settimanale:"],
        [],
        ["Settimana", "Data Inizio", "Data Fine", "Dose Latte/G (L)", "Acqua / G.", "Polvere di latte / G.", "Latte / pasto", "Acqua / pasto", "Polvere / Pasto", "Pasti/G", "Concentrazione (%)"],
      ];

      schedule.forEach(row => {
        ws_data.push([
          row.settimana,
          row.dataInizio,
          row.dataFine,
          row.latteGiornaliero.toFixed(2),
          row.acquaGiornaliera.toFixed(2),
          row.polvereGiornaliera.toFixed(2),
          row.lattePerPasto.toFixed(2),
          row.acquaPerPasto.toFixed(2),
          row.polverePerPasto.toFixed(2),
          row.pasti,
          typeof row.concentrazione === 'number' ? `${row.concentrazione.toFixed(1)}%` : row.concentrazione,
        ]);
      });

      const ws = window.XLSX.utils.aoa_to_sheet(ws_data);

      // Merge cells for title
      ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }]; // Merge A1 to F1

      // Styling headers
      const headerRowIndex = 8; // Row where schedule headers start
      for (let C = 0; C < ws_data[headerRowIndex].length; ++C) {
        const cell_address = window.XLSX.utils.encode_cell({r:headerRowIndex, c:C});
        if (!ws[cell_address]) ws[cell_address] = {};
        ws[cell_address].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "D3D3D3" } },
          alignment: { horizontal: "center", vertical: "center", wrapText: true }
        };
      }

      window.XLSX.utils.book_append_sheet(wb, ws, `Dettagli Vitello ${dataToExport.matricola}`);
      window.XLSX.writeFile(wb, `Svezzamento_${dataToExport.matricola}.xlsx`);
      // Replaced alert with custom modal
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      successModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Esportazione XLSX Completata</h3>
          <p class="mb-6">Programma di svezzamento salvato con successo in Svezzamento_${dataToExport.matricola}.xlsx</p>
          <div class="flex justify-end">
            <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(successModal);
      document.getElementById('closeSuccessModal').onclick = () => {
        document.body.removeChild(successModal);
      };

    } else {
      // All Calves Excel
      const headers = [
        "Matricola", "Data di Nascita", "Tipo Latte", "Da -> A",
        "Dose Totale Giornaliera (L)", "Dose Acqua Giornaliera (L)",
        "Dose Polvere Giornaliera (kg)",
        "Dose Latte per Pasto (L)", "Dose Acqua per Pasto (L)",
        "Dose Polvere per Pasto (kg)",
        "Pasti", "Giorni allo Svezzamento"
      ];
      const data = vitelliDisplayedData.map(calf => [ // Use vitelliDisplayedData here
        calf.matricola,
        calf.data_nascita,
        calf.milk_type === 'cow_milk' ? 'Vacca' : 'Polvere', // Display milk type in table
        calf.calculated_details.dates_range_text || '',
        calf.calculated_details.latte_giornaliero.toFixed(2),
        calf.calculated_details.acqua_giornaliera.toFixed(2),
        calf.calculated_details.polvere_giornaliera.toFixed(2),
        calf.calculated_details.latte_per_pasto.toFixed(2),
        calf.calculated_details.acqua_per_pasto.toFixed(2),
        calf.calculated_details.polvere_per_pasto.toFixed(2),
        calf.calculated_details.pasti,
        calf.calculated_details.giorni_mancanti_text || ''
      ]);

      const ws = window.XLSX.utils.aoa_to_sheet([headers, ...data]);

      // Styling headers
      for (let C = 0; C < headers.length; ++C) {
        const cell_address = window.XLSX.utils.encode_cell({r:0, c:C});
        if (!ws[cell_address]) ws[cell_address] = {};
        ws[cell_address].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "808080" } }, // Grey
          alignment: { horizontal: "center", vertical: "center", wrapText: true }
        };
      }

      window.XLSX.utils.book_append_sheet(wb, ws, "Dati Vitello");
      window.XLSX.writeFile(wb, "Dati_Vitelli.xlsx");
      // Replaced alert with custom modal
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      successModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Esportazione XLSX Completata</h3>
          <p class="mb-6">Dati esportati con successo</p>
          <div class="flex justify-end">
            <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(successModal);
      document.getElementById('closeSuccessModal').onclick = () => {
        document.body.removeChild(successModal);
      };
    }
  };

  // Default configuration
  const getDefaultConfig = React.useCallback(() => [
    { "settimana": 1, "dose_kg": 2.8, "descrizione": "Prima settimana di alimentazione", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 2, "dose_kg": 2.8, "descrizione": "Seconda settimana", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 3, "dose_kg": 3.5, "descrizione": "Inizio aumento dose", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 4, "dose_kg": 4.2, "descrizione": "Aumento progressivo", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 5, "dose_kg": 4.9, "descrizione": "Dose massima", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 6, "dose_kg": 4.9, "descrizione": "Mantenere dose massima", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 7, "dose_kg": 4.9, "descrizione": "Mantenere dose massima", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 8, "dose_kg": 4.2, "descrizione": "Inizio riduzione dose", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 9, "dose_kg": 3.5, "descrizione": "Riduzione intermedia", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 10, "dose_kg": 2.8, "descrizione": "Ulteriore riduzione", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 11, "dose_kg": 2.8, "descrizione": "Fase pre-svezzamento", "pasti": 2, "concentrazione_percentuale": 10.0 },
    { "settimana": 12, "dose_kg": 1.4, "descrizione": "Svezzamento finale", "pasti": 1, "concentrazione_percentuale": 10.0 }
  ], []);

  // Load configuration using Electron API
  const loadConfiguration = React.useCallback(async () => {
    try {
      const response = await window.electronAPI.loadConfig();
      if (response.success && response.data) {
        let loadedConfig = response.data;
        let latteSettimanale = loadedConfig.latte_settimanale;

        if (!Array.isArray(latteSettimanale) || latteSettimanale.length === 0) {
          console.warn("L'elenco 'latte_settimanale' non è stato trovato o è vuoto/malformato nel file di configurazione. Verranno usati i valori predefiniti.");
          latteSettimanale = getDefaultConfig();
        } else {
          latteSettimanale = latteSettimanale.map(item => ({
            settimana: item.settimana,
            dose_kg: item.dose_kg !== undefined ? item.dose_kg : 0,
            descrizione: item.descrizione,
            pasti: item.pasti !== undefined ? item.pasti : 2,
            concentrazione_percentuale: item.concentrazione_percentuale !== undefined ? item.concentrazione_percentuale : 10.0,
          }));
        }

        setConfig(prevConfig => ({
          ...prevConfig,
          latte_settimanale: latteSettimanale,
        }));
      } else {
        console.warn("Nessun file di configurazione trovato o errore durante il caricamento. Verranno usati i valori predefiniti.");
        setConfig(prevConfig => ({
          ...prevConfig,
          latte_settimanale: getDefaultConfig(),
        }));
      }
    } catch (e) {
      console.error("Errore durante il caricamento della configurazione dal file system:", e);
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Configurazione</h3>
          <p class="mb-6">Errore durante il caricamento del file di configurazione. Verranno usati i valori predefiniti.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
      setConfig(prevConfig => ({
        ...prevConfig,
        latte_settimanale: getDefaultConfig(),
      }));
    }
  }, [getDefaultConfig]);

  // Save configuration using Electron API
  const saveConfig = React.useCallback(async (updatedConfig) => {
    try {
      const response = await window.electronAPI.saveConfig(updatedConfig);
      if (response.success) {
        setConfig(updatedConfig);
      } else {
        console.error("Errore durante il salvataggio della configurazione nel file system:", response.error);
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Salvataggio</h3>
            <p class="mb-6">Errore durante il salvataggio della configurazione: ${response.error}</p>
            <div class="flex justify-end">
              <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        document.getElementById('closeErrorModal').onclick = () => {
          document.body.removeChild(errorModal);
        };
      }
    } catch (e) {
      console.error("Errore durante la chiamata a saveConfig via Electron API:", e);
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Salvataggio</h3>
          <p class="mb-6">Errore durante il salvataggio della configurazione.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
    }
  }, []);

  // Save calf raw data using Electron API
  const saveCalfData = React.useCallback(async (data) => {
    try {
      const response = await window.electronAPI.saveCalfData(data);
      if (response.success) {
        setVitelliRawData(data); // This is crucial: update vitelliRawData
      } else {
        console.error("Errore durante il salvataggio dei dati del vitello nel file system:", response.error);
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Salvataggio</h3>
            <p class="mb-6">Errore durante il salvataggio dei dati del vitello: ${response.error}</p>
            <div class="flex justify-end">
              <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        document.getElementById('closeErrorModal').onclick = () => {
          document.body.removeChild(errorModal);
        };
      }
    } catch (e) {
      console.error("Errore durante la chiamata a saveCalfData via Electron API:", e);
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Salvataggio</h3>
          <p class="mb-6">Errore durante il salvataggio dei dati del vitello.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
    }
  }, []);

  // Function to load all data (config and calf data)
  const loadAllData = React.useCallback(async () => {
    // Load configuration first
    await loadConfiguration();

    // Then load calf data
    try {
      const response = await window.electronAPI.loadCalfData();
      if (response.success && response.data) {
        const loadedData = response.data;
        // Ensure imported calves have a milk_type, default to powdered_milk if missing
        const sanitizedData = loadedData.map(calf => {
            const sanitizedCalf = {
                ...calf,
                milk_type: calf.milk_type || 'powdered_milk',
            };
            // Attempt to reformat data_nascita if it's not DD/MM/YYYY
            // First, check if it's already in DD/MM/YYYY. If parseDateToYYYYMMDD returns null, it's not.
            // If it's not, try to create a Date object and then format it.
            if (!parseDateToYYYYMMDD(sanitizedCalf.data_nascita)) {
                try {
                    const tempDate = new Date(sanitizedCalf.data_nascita);
                    if (!isNaN(tempDate.getTime())) {
                        sanitizedCalf.data_nascita = formatDate(tempDate);
                    } else {
                        console.warn(`Data di nascita per ${sanitizedCalf.matricola} non valida e non riformattabile: ${sanitizedCalf.data_nascita}`);
                        sanitizedCalf.data_nascita = ''; // Clear invalid date
                    }
                } catch (dateError) {
                    console.error(`Errore durante la riformattazione della data per ${sanitizedCalf.matricola}:`, dateError);
                    sanitizedCalf.data_nascita = ''; // Clear invalid date
                }
            }
            return sanitizedCalf;
        });
        setVitelliRawData(sanitizedData);
      } else {
        console.warn("Nessun file di dati vitelli trovato o errore durante il caricamento. Verrà avviato un nuovo elenco vuoto.");
        setVitelliRawData([]);
      }
    } catch (e) {
      console.error("Errore durante il caricamento dei dati del vitello dal file system:", e);
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Caricamento Dati</h3>
          <p class="mb-6">Errore durante il caricamento dei dati del vitello. Verrà avviato un nuovo elenco vuoto.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
      setVitelliRawData([]);
    }
  }, [loadConfiguration]);

  // Initial load: loads configuration and raw calf data using Electron API
  React.useEffect(() => {
    loadAllData();
  }, [loadAllData]); // Depend on loadAllData

  // Pure function to calculate details for calves and overall totals
  // This function does NOT modify state directly, it returns the calculated values.
  const calculateCalfDetailsAndTotals = React.useCallback((currentRawCalves, globalConfig) => {
    let totLatteGiornaliero = 0.0;
    let totAcquaGiornaliera = 0.0; // This will only sum water for powder reconstitution
    let totPolvereGiornaliera = 0.0; // This will only sum powder

    let totLattePerPasto = 0.0;
    let totAcquaPerPasto = 0.0; // This will only sum water for powder reconstitution
    let totPolverePerPastoTotal = 0.0; // This will only sum powder
    let currentTotalKgWeaningFromToday = 0.0; // This will only sum powder remaining

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const calculatedCalves = currentRawCalves.map(calf => {
      let doseGiornalieraText = "";
      let dosePerPastoText = "";
      let giorniMancantiText = "";
      let datesRangeText = "";

      let latteGiornaliero = 0.0;
      let acquaGiornaliera = 0.0;
      let polvereGiornaliera = 0.0;
      let lattePerPasto = 0.0;
      let acquaPerPasto = 0.0;
      let polverePerPastoValue = 0.0;
      let pasti = 0;
      let concentrazionePercentuale = 10.0; // Default, might be overridden or ignored

      let giorniPassati = 0;

      const calfConfig = (calf.individual_config && calf.individual_config.length > 0)
                           ? calf.individual_config
                           : globalConfig.latte_settimanale;

      const isCowMilk = calf.milk_type === 'cow_milk';

      const dNascitaStr = calf.data_nascita;
      if (dNascitaStr) {
        try {
            const dataNascitaYYYYMMDD = parseDateToYYYYMMDD(dNascitaStr);
            if (!dataNascitaYYYYMMDD) {
                throw new Error("Invalid date format for calculation");
            }
            const dataDt = new Date(dataNascitaYYYYMMDD);
            if (isNaN(dataDt.getTime())) {
                throw new Error("Invalid date object after parsing");
            }
            dataDt.setHours(0, 0, 0, 0);

            const diffTime = Math.abs(today - dataDt);
            giorniPassati = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            const giorniAlloSvezzamento = DURATA_SVEZZAMENTO_GIORNI - giorniPassati;
            giorniMancantiText = giorniAlloSvezzamento > 0 ? `${giorniAlloSvezzamento} giorni` : "Svezzato";

            if (calfConfig && calfConfig.length > 0) {
              const settimaneIdx = Math.min(Math.floor(giorniPassati / 7), calfConfig.length - 1);
              const currentWeekConfig = calfConfig[settimaneIdx];

              const dataInizioSettimanaCorrente = new Date(dataDt);
              dataInizioSettimanaCorrente.setDate(dataDt.getDate() + settimaneIdx * 7);
              const dataFineSettimana = new Date(dataInizioSettimanaCorrente);
              dataFineSettimana.setDate(dataInizioSettimanaCorrente.getDate() + 6);
              datesRangeText = `${formatDate(dataInizioSettimanaCorrente)} -> ${formatDate(dataFineSettimana)}`;

              pasti = currentWeekConfig.pasti || 2;

              if (isCowMilk) {
                  // For cow milk, dose_kg stores the *weekly liters of cow milk*
                  latteGiornaliero = (currentWeekConfig.dose_kg || 0) / 7;
                  acquaGiornaliera = 0.0;
                  polvereGiornaliera = 0.0;
                  concentrazionePercentuale = 'N/A'; // Not applicable

                  if (pasti > 0) {
                      lattePerPasto = latteGiornaliero / pasti;
                      acquaPerPasto = 0.0;
                      polverePerPastoValue = 0.0;
                  } else {
                      lattePerPasto = 0.0;
                      acquaPerPasto = 0.0;
                      polverePerPastoValue = 0.0;
                  }

                  doseGiornalieraText = `Latte vacca: ${latteGiornaliero.toFixed(2)} L`;
                  dosePerPastoText = `Latte vacca: ${lattePerPasto.toFixed(2)} L (${pasti} pasti)`;
                  giorniMancantiText += " (Latte Vacca)";

              } else { // Powdered milk calculation
                const lattePolvereSettimanale = currentWeekConfig.dose_kg;
                concentrazionePercentuale = currentWeekConfig.concentrazione_percentuale || 10.0;

                polvereGiornaliera = lattePolvereSettimanale / 7;
                latteGiornaliero = polvereGiornaliera * (100 / concentrazionePercentuale);
                acquaGiornaliera = latteGiornaliero - polvereGiornaliera;

                if (pasti > 0) {
                  polverePerPastoValue = polvereGiornaliera / pasti;
                  lattePerPasto = latteGiornaliero / pasti;
                  acquaPerPasto = acquaGiornaliera / pasti;
                }

                doseGiornalieraText = `Latte: ${latteGiornaliero.toFixed(2)} L\nAcqua: ${acquaGiornaliera.toFixed(2)} L\nPolvere di latte: ${polvereGiornaliera.toFixed(2)} kg`;
                dosePerPastoText = `Latte: ${lattePerPasto.toFixed(2)} L\nAcqua: ${acquaPerPasto.toFixed(2)} L\nPolvere: ${polverePerPastoValue.toFixed(2)} kg\n(${pasti} pasti)`;

                // Calculate remaining powder only for powdered milk calves
                let milkPerCalfRemaining = 0.0;
                const currentWeekIndex = Math.floor(giorniPassati / 7);
                const daysIntoCurrentWeek = giorniPassati % 7;
                const remainingDaysInCurrentWeek = 7 - daysIntoCurrentWeek;

                if (giorniPassati < DURATA_SVEZZAMENTO_GIORNI) {
                  if (currentWeekIndex < calfConfig.length) {
                    const currentConfigItem = calfConfig[currentWeekIndex];
                    const dailyPowderCurrentWeek = (currentConfigItem.dose_kg || 0) / 7;
                    milkPerCalfRemaining += dailyPowderCurrentWeek * remainingDaysInCurrentWeek;
                  }

                  for (let i = currentWeekIndex + 1; i < calfConfig.length; i++) {
                    const configItem = calfConfig[i];
                    milkPerCalfRemaining += (configItem.dose_kg || 0);
                  }
                }
                currentTotalKgWeaningFromToday += milkPerCalfRemaining;
              }
            } else { // No calfConfig
              doseGiornalieraText = "Dati mancanti";
              dosePerPastoText = "Dati mancanti";
              giorniMancantiText = "N/A";
              datesRangeText = "N/A";
            }
        } catch (e) {
          console.error("Errore di calcolo per il vitello:", calf.matricola, e);
          doseGiornalieraText = "Errore Data / Calcolo";
          dosePerPastoText = "Errore Data / Calcolo";
          giorniMancantiText = "Errore";
          datesRangeText = "Errore";
        }
      } else { // No dNascitaStr
        doseGiornalieraText = "Dati mancanti";
        dosePerPastoText = "Dati mancanti";
        giorniMancantiText = "N/A";
        datesRangeText = "N/A";
      }

      // Aggregate totals based on milk type and weaning status
      if (giorniPassati < DURATA_SVEZZAMENTO_GIORNI) {
          totLatteGiornaliero += latteGiornaliero; // Sum actual liquid milk (powder reconstituted or cow milk)
          if (!isCowMilk) { // Only sum water and powder for non-cow milk (powdered milk)
              totAcquaGiornaliera += acquaGiornaliera;
              totPolvereGiornaliera += polvereGiornaliera;
              totAcquaPerPasto += acquaPerPasto;
              totPolverePerPastoTotal += polverePerPastoValue;
              totLattePerPasto += lattePerPasto; // Also add for powdered milk to its specific total
          } else {
             // For cow milk, lattePerPasto has already been set, no other totals for powder/water
             totLattePerPasto += lattePerPasto; // Add cow milk per-pasto to total
          }
      }

      return {
        ...calf,
        milk_type: calf.milk_type || 'powdered_milk', // Ensure milk_type is always set
        calculated_details: {
          dose_giornaliera_text: doseGiornalieraText,
          dose_per_pasto_text: dosePerPastoText,
          giorni_mancanti_text: giorniMancantiText,
          dates_range_text: datesRangeText,
          latte_giornaliero: latteGiornaliero,
          acqua_giornaliera: acquaGiornaliera,
          polvere_giornaliera: polvereGiornaliera,
          latte_per_pasto: lattePerPasto,
          acqua_per_pasto: acquaPerPasto,
          polvere_per_pasto: polverePerPastoValue,
          pasti: pasti,
          concentrazione_percentuale: concentrazionePercentuale,
        }
      };
    });

    return {
        calculatedCalves,
        totals: {
            latte: totLatteGiornaliero,
            acqua: totAcquaGiornaliera,
            polvere: totPolvereGiornaliera,
            lattePasto: totLattePerPasto,
            acquaPasto: totAcquaPerPasto,
            polverePastoTotal: totPolverePerPastoTotal
        },
        totalKgWeaningFromToday: currentTotalKgWeaningFromToday
    };
  }, []);

  // Effect to perform calculations and update display states whenever raw data or config changes
  React.useEffect(() => {
    // This effect runs whenever vitelliRawData or config.latte_settimanale changes.
    // It calls the pure calculation function and updates the display states.
    if (!config.latte_settimanale || config.latte_settimanale.length === 0) {
      console.warn("Configurazione 'latte_settimanale' globale non disponibile, salto il ricalcolo per la visualizzazione.");
      setVitelliDisplayedData([]);
      setTotals({ latte: 0, acqua: 0, polvere: 0, lattePasto: 0, acquaPasto: 0, polverePastoTotal: 0 });
      setTotalKgWeaningFromToday(0);
      return;
    }
    const { calculatedCalves, totals: newTotals, totalKgWeaningFromToday: newTotalKgWeaningFromToday } = calculateCalfDetailsAndTotals(vitelliRawData, config);
    setVitelliDisplayedData(calculatedCalves);
    setTotals(newTotals);
    setTotalKgWeaningFromToday(newTotalKgWeaningFromToday);
  }, [vitelliRawData, config.latte_settimanale, calculateCalfDetailsAndTotals, config]);

  // Add new calf
  const addCalf = () => {
    if (!newMatricola.trim()) {
      // Replaced alert with custom modal
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Input</h3>
          <p class="mb-6">Inserisci la Matricola per il nuovo vitello.</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
      return;
    }
    if (!newDataNascita.trim()) {
      // Replaced alert with custom modal
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Input</h3>
          <p class="mb-6">Inserisci la Data di Nascita per il nuovo vitello (gg/mm/aaaa).</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorError').onclick = () => {
        document.body.removeChild(errorModal);
      };
      return;
    }

    try {
      const formattedDate = parseDateToYYYYMMDD(newDataNascita);
      if (!formattedDate) {
          // Replaced alert with custom modal
          const errorModal = document.createElement('div');
          errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
          errorModal.innerHTML = `
            <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
              <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Formato Data</h3>
              <p class="mb-6">La Data di Nascita deve essere nel formato gg/mm/aaaa e valida.</p>
              <div class="flex justify-end">
                <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
              </div>
            </div>
          `;
          document.body.appendChild(errorModal);
          document.getElementById('closeErrorModal').onclick = () => {
            document.body.removeChild(errorModal);
          };
          return;
      }
      if (vitelliRawData.some(calf => calf.matricola === newMatricola)) {
        // Replaced alert with custom modal
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Matricola Esistente</h3>
            <p class="mb-6">La matricola '${newMatricola}' esiste già. Inserisci una matricola unica.</p>
            <div class="flex justify-end">
              <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        document.getElementById('closeErrorModal').onclick = () => {
          document.body.removeChild(errorModal);
        };
        return;
      }

      const updatedRawCalves = [...vitelliRawData, { matricola: newMatricola, data_nascita: newDataNascita, milk_type: 'powdered_milk' }]; // Default new calf to powdered milk
      saveCalfData(updatedRawCalves); // Save raw data, which will trigger the calculation useEffect
      setNewMatricola('');
      setNewDataNascita('');
    } catch (e) {
      console.error("Errore nell'aggiunta del vitello:", e);
      // Replaced alert with custom modal
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Aggiunta Vitello</h3>
          <p class="mb-6">Errore durante l'aggiunta del vitello. Dettagli: ${e.message}</p>
          <div class="flex justify-end">
            <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(errorModal);
      document.getElementById('closeErrorModal').onclick = () => {
        document.body.removeChild(errorModal);
      };
    }
  };

  // Delete calf
  const deleteCalf = (matricolaToDelete) => {
    // Custom confirmation dialog
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
    confirmDialog.innerHTML = `
      <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
        <h3 class="text-lg font-semibold mb-4">Conferma Eliminazione Vitello</h3>
        <p class="mb-6">Sei sicuro di voler eliminare il vitello con matricola: ${matricolaToDelete}?</p>
        <div class="flex justify-end space-x-4">
          <button id="cancelDelete" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Annulla</button>
          <button id="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Elimina</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmDialog);

    document.getElementById('cancelDelete').onclick = () => {
      document.body.removeChild(confirmDialog);
    };

    document.getElementById('confirmDelete').onclick = () => {
      document.body.removeChild(confirmDialog);
      const updatedRawCalves = vitelliRawData.filter(calf => calf.matricola !== matricolaToDelete);
      saveCalfData(updatedRawCalves); // Save raw data, which will trigger the calculation useEffect
    };
  };

  // Update calf data from table edit (simplified, direct update via state)
  const handleCalfDataChange = (index, field, value) => {
    const updatedRawCalves = [...vitelliRawData]; // Create a mutable copy

    if (field === "data_nascita") {
      const parsedNewDate = parseDateToYYYYMMDD(value);
      if (!parsedNewDate) {
          // Replaced alert with custom modal
          const errorModal = document.createElement('div');
          errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
          errorModal.innerHTML = `
            <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
              <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Formato Data</h3>
              <p class="mb-6">La Data di Nascita deve essere nel formato gg/mm/aaaa e valida. Ripristino al valore precedente.</p>
              <div class="flex justify-end">
                <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
              </div>
            </div>
          `;
          document.body.appendChild(errorModal);
          document.getElementById('closeErrorModal').onclick = () => {
            document.body.removeChild(errorModal);
          };
          return; // Don't save if invalid
      }
      updatedRawCalves[index].data_nascita = value; // Store as DD/MM/YYYY
    } else if (field === "matricola") {
        if (!value.trim()) {
            // Replaced alert with custom modal
            const errorModal = document.createElement('div');
            errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
            errorModal.innerHTML = `
              <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
                <h3 class="text-lg font-semibold mb-4 text-red-400">Matricola Vuota</h3>
                <p class="mb-6">La matricola non può essere vuota. Ripristino al valore precedente.</p>
                <div class="flex justify-end">
                  <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
                </div>
              </div>
            `;
            document.body.appendChild(errorModal);
            document.getElementById('closeErrorModal').onclick = () => {
              document.body.removeChild(errorModal);
            };
            return; // Don't save if invalid
        }
        if (updatedRawCalves.some((c, i) => i !== index && c.matricola === value)) {
            // Replaced alert with custom modal
            const errorModal = document.createElement('div');
            errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
            errorModal.innerHTML = `
              <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
                <h3 class="text-lg font-semibold mb-4 text-red-400">Matricola Duplicata</h3>
                <p class="mb-6">La matricola '${value}' esiste già. Ripristino al valore precedente.</p>
                <div class="flex justify-end">
                  <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
                </div>
              </div>
            `;
            document.body.appendChild(errorModal);
            document.getElementById('closeErrorModal').onclick = () => {
              document.body.removeChild(errorModal);
            };
            return; // Don't save if duplicate
        }
        updatedRawCalves[index].matricola = value; // Update matricola
    } else {
        updatedRawCalves[index][field] = value; // Generic update for other fields
    }
    saveCalfData(updatedRawCalves); // Save raw data, which will trigger the calculation useEffect
  };

  // Clear empty rows
  const clearEmptyRows = () => {
    const initialCount = vitelliRawData.length;
    const filteredCalves = vitelliRawData.filter(
      (calf) => calf.matricola.trim() || calf.data_nascita.trim()
    );
    if (filteredCalves.length < initialCount) {
      saveCalfData(filteredCalves); // Save raw data, which will trigger the calculation useEffect
      // Replaced alert with custom modal
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      successModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Eliminazione Righe Vuote</h3>
          <p class="mb-6">Righe vuote eliminate con successo.</p>
          <div class="flex justify-end">
            <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(successModal);
      document.getElementById('closeSuccessModal').onclick = () => {
        document.body.removeChild(successModal);
      };
    } else {
      // Replaced alert with custom modal
      const infoModal = document.createElement('div');
      infoModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      infoModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Informazioni</h3>
          <p class="mb-6">Nessuna riga vuota da eliminare.</p>
          <div class="flex justify-end">
            <button id="closeInfoModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(infoModal);
      document.getElementById('closeInfoModal').onclick = () => {
        document.body.removeChild(infoModal);
      };
    }
  };

  // Sort by date
  const sortByDate = (ascending = true) => {
    const sortedRawCalves = [...vitelliRawData].sort((a, b) => {
      try {
        const dateA_YYYYMMDD = parseDateToYYYYMMDD(a.data_nascita);
        const dateB_YYYYMMDD = parseDateToYYYYMMDD(b.data_nascita);
        
        if (!dateA_YYYYMMDD || !dateB_YYYYMMDD) {
          console.warn("Date non valide trovate durante l'ordinamento. L'ordinamento potrebbe essere impreciso.");
          return 0; // Don't sort if dates are invalid
        }
        
        const dateA = new Date(dateA_YYYYMMDD);
        const dateB = new Date(dateB_YYYYMMDD);
        return ascending ? dateA - dateB : dateB - dateA; // Corrected: dateB - dateA for descending
      } catch (e) {
        console.error("Errore durante l'ordinamento per data:", e);
        return 0; // Don't sort if dates are invalid
      }
    });
    saveCalfData(sortedRawCalves); // Save the sorted raw data, which will trigger the calculation useEffect
  };

  // Handle saving global settings from modal
  const handleSaveGlobalSettings = (newLatteSettimanaleConfig) => {
    const updatedConfig = { ...config, latte_settimanale: newLatteSettimanaleConfig };
    saveConfig(updatedConfig);
    // Replaced alert with custom modal
    const successModal = document.createElement('div');
    successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
    successModal.innerHTML = `
      <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
        <h3 class="text-lg font-semibold mb-4">Salvataggio Completato</h3>
        <p class="mb-6">Impostazioni di consumo di latte globali salvate con successo.</p>
        <div class="flex justify-end">
          <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
        </div>
      </div>
    `;
    document.body.appendChild(successModal);
    document.getElementById('closeSuccessModal').onclick = () => {
      document.body.removeChild(successModal);
    };
  };

  // Handle saving individual calf settings
  const handleSaveIndividualCalfSettings = (matricola, newSettings, milkType) => {
    const updatedRawCalves = vitelliRawData.map(calf => {
      if (calf.matricola === matricola) {
        return { ...calf, individual_config: newSettings, milk_type: milkType };
      }
      return calf;
    });
    saveCalfData(updatedRawCalves);
    // Replaced alert with custom modal
    const successModal = document.createElement('div');
    successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
    successModal.innerHTML = `
      <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
        <h3 class="text-lg font-semibold mb-4">Salvataggio Completato</h3>
        <p class="mb-6">Impostazioni individuali per il vitello ${matricola} salvate con successo.</p>
        <div class="flex justify-end">
          <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
        </div>
      </div>
    `;
    document.body.appendChild(successModal);
    document.getElementById('closeSuccessModal').onclick = () => {
      document.body.removeChild(successModal);
    };
  };

  // Handle resetting individual calf settings to global default
  const handleResetIndividualCalfSettings = (matricola) => {
    const updatedRawCalves = vitelliRawData.map(calf => {
      if (calf.matricola === matricola) {
        // Remove individual_config and reset milk_type to force use of global config
        const { individual_config, milk_type, ...rest } = calf;
        return { ...rest, milk_type: 'powdered_milk' }; // Explicitly set to powdered milk
      }
      return calf;
    });
    saveCalfData(updatedRawCalves);
    // Replaced alert with custom modal
    const successModal = document.createElement('div');
    successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
    successModal.innerHTML = `
      <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
        <h3 class="text-lg font-semibold mb-4">Ripristino Completato</h3>
        <p class="mb-6">Impostazioni individuali per il vitello ${matricola} ripristinate ai valori predefiniti globali.</p>
        <div class="flex justify-end">
          <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
        </div>
      </div>
    `;
    document.body.appendChild(successModal);
    document.getElementById('closeSuccessModal').onclick = () => {
      document.body.removeChild(successModal);
    };
  };

  // Update clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentClock(new Date().toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return React.createElement(
    "div",
    { className: "min-h-screen p-4 font-sans antialiased bg-gray-800 text-gray-100" }, // Set default dark theme colors
    React.createElement(
      "div",
      { className: "container mx-auto p-6 bg-gray-700 rounded-lg shadow-xl" }, // Set default dark theme colors
      React.createElement("h1", { className: "text-3xl font-bold text-center mb-6 text-blue-400" }, "Calcolo Polvere di Latte"), // Set default dark theme colors
      React.createElement(
        "div",
        { className: "flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-600 rounded-md shadow-sm" }, // Set default dark theme colors
        React.createElement("label", { className: "font-semibold" }, "Nuova Matricola:"),
        React.createElement("input", {
          type: "text",
          className: "flex-1 min-w-[100px] p-2 border border-gray-700 rounded-md bg-gray-500 text-gray-100", // Set default dark theme colors
          value: newMatricola,
          onChange: (e) => setNewMatricola(e.target.value),
          placeholder: "Es. V001",
        }),
        React.createElement("label", { className: "font-semibold" }, "Data di Nascita (gg/mm/aaaa):"),
        React.createElement("input", {
          type: "text",
          className: "flex-1 min-w-[150px] p-2 border border-gray-700 rounded-md bg-gray-500 text-gray-100", // Set default dark theme colors
          value: newDataNascita,
          onChange: (e) => setNewDataNascita(e.target.value),
          placeholder: "Es. 01/01/2023",
        }),
        React.createElement(
          "button",
          {
            onClick: addCalf,
            className: "flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200",
            title: "Aggiungi Riga",
          },
          React.createElement(PlusIcon, { size: 20, className: "mr-2" }),
          " Aggiungi"
        ),
        React.createElement(
          "button",
          {
            onClick: () => {
              // Trigger a recalculation based on current raw data and config
              if (config.latte_settimanale && config.latte_settimanale.length > 0) {
                 const { calculatedCalves, totals: newTotals, totalKgWeaningFromToday: newTotalKgWeaningFromToday } = calculateCalfDetailsAndTotals(vitelliRawData, config);
                 setVitelliDisplayedData(calculatedCalves);
                 setTotals(newTotals);
                 setTotalKgWeaningFromToday(newTotalKgWeaningFromToday);
              }
              // Replaced alert with custom modal
              const infoModal = document.createElement('div');
              infoModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
              infoModal.innerHTML = `
                <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
                  <h3 class="text-lg font-semibold mb-4">Ricalcolo Completato</h3>
                  <p class="mb-6">Dosi ricalcolate con successo.</p>
                  <div class="flex justify-end">
                    <button id="closeInfoModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
                  </div>
                </div>
              `;
              document.body.appendChild(infoModal);
              document.getElementById('closeInfoModal').onclick = () => {
                document.body.removeChild(infoModal);
              };
            },
            className: "flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200",
            title: "Ricalcola Dosi",
          },
          React.createElement(RefreshCcwIcon, { size: 20, className: "mr-2" }),
          " Ricalcola"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-gray-600 rounded-md shadow-sm" }, // Changed to justify-between
        React.createElement(
          "div",
          { className: "flex items-center gap-3" }, // Group for sorting buttons
          React.createElement(
            "button",
            {
              onClick: () => sortByDate(true),
              className: "flex items-center px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500 transition duration-200 shadow-md", // Set default dark theme colors
            },
            React.createElement(SortAscIcon, { size: 20, className: "mr-2" }),
            " Ordina per Data Crescente"
          ),
          React.createElement(
            "button",
            {
              onClick: () => sortByDate(false),
              className: "flex items-center px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500 transition duration-200 shadow-md", // Set default dark theme colors
            },
            React.createElement(SortDescIcon, { size: 20, className: "mr-2" }),
            " Ordina per Data Decrescente"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-3" }, // Group for export/print buttons
          React.createElement(
            "button",
            {
              onClick: () => exportDataToPdf(null),
              className: "flex items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200 shadow-md",
            },
            React.createElement(FileTextIcon, { size: 20, className: "mr-2" }),
            " Salva PDF (Tutti)"
          ),
          React.createElement(
            "button",
            {
              onClick: () => exportToXlsx(null),
              className: "flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200 shadow-md",
            },
            React.createElement(FileSpreadsheetIcon, { size: 20, className: "mr-2" }),
            " Esporta in Excel (Tutti)" // Changed text here
          )
        )
      ),
      React.createElement(
        "div",
        { className: "overflow-x-auto mb-6 border border-gray-600 rounded-lg shadow-md" }, // Set default dark theme colors
        React.createElement(
          "table",
          { className: "min-w-full bg-gray-800 rounded-lg text-sm" }, // Set default dark theme colors
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { className: "bg-gray-700" }, // Set default dark theme colors
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Matricola"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Data di Nascita"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Tipo Latte"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Da \u2192 A"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Dose Totale Giornaliera"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Dose per Pasto"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Giorni allo Svezzamento"),
              React.createElement("th", { className: "py-3 px-4 text-center border-b" }, "Dettagli/Impostazioni"),
              React.createElement("th", { className: "py-3 px-4 text-center border-b" }, "Cancella")
            )
          ),
          React.createElement(
            "tbody",
            null,
            vitelliDisplayedData.length > 0
              ? vitelliDisplayedData.map((calf, index) =>
                  React.createElement(
                    "tr",
                    { key: calf.matricola || index, className: "border-b border-gray-600 hover:bg-gray-700" }, // Set default dark theme colors
                    React.createElement(
                      "td",
                      { className: "py-3 px-4" },
                      React.createElement("input", {
                        type: "text",
                        value: calf.matricola,
                        onChange: (e) => handleCalfDataChange(index, "matricola", e.target.value),
                        className: "w-full bg-transparent border-none focus:outline-none text-gray-100", // Set default dark theme colors
                      })
                    ),
                    React.createElement(
                      "td",
                      { className: "py-3 px-4" },
                      React.createElement("input", {
                        type: "text",
                        value: calf.data_nascita, // Display original DD/MM/YYYY
                        onChange: (e) => handleCalfDataChange(index, "data_nascita", e.target.value),
                        className: "w-full bg-transparent border-none focus:outline-none text-gray-100", // Set default dark theme colors
                      })
                    ),
                    React.createElement("td", { className: "py-3 px-4 whitespace-pre-wrap" }, calf.milk_type === 'cow_milk' ? 'Vacca' : 'Polvere'),
                    React.createElement("td", { className: "py-3 px-4 whitespace-pre-wrap" }, calf.calculated_details.dates_range_text || "N/A"),
                    React.createElement("td", { className: "py-3 px-4 whitespace-pre-wrap" }, calf.calculated_details.dose_giornaliera_text || "N/A"),
                    React.createElement("td", { className: "py-3 px-4 whitespace-pre-wrap" }, calf.calculated_details.dose_per_pasto_text || "N/A"),
                    React.createElement("td", { className: "py-3 px-4 text-center" }, calf.calculated_details.giorni_mancanti_text || "N/A"),
                    React.createElement(
                      "td",
                      { className: "py-3 px-4" },
                      React.createElement(
                        "div",
                        { className: "flex justify-center items-center space-x-2 h-full" },
                        React.createElement(
                          "button",
                          {
                            onClick: () => {
                              setSelectedCalf(calf);
                              setShowCalfDetailModal(true);
                            },
                            className: "p-2 rounded-full hover:bg-gray-600 transition duration-200", // Set default dark theme colors
                            title: "Vedi Dettagli",
                          },
                          React.createElement(FileTextIcon, { size: 20, className: "text-blue-300" }) // Set default dark theme colors
                        ),
                         React.createElement(
                          "button",
                          {
                            onClick: () => {
                              setSelectedCalf(calf);
                              setShowCalfSpecificSettingsModal(true);
                            },
                            className: "p-2 rounded-full hover:bg-gray-600 transition duration-200", // Set default dark theme colors
                            title: "Modifica Impostazioni Individuali",
                          },
                          React.createElement(SettingsIcon, { size: 20, className: "text-gray-300" }) // Set default dark theme colors
                        )
                      )
                    ),
                    React.createElement(
                      "td",
                      { className: "py-3 px-4 text-center" },
                      React.createElement(
                        "button",
                        {
                          onClick: () => deleteCalf(calf.matricola),
                          className: "p-2 rounded-full hover:bg-red-800 transition duration-200", // Set default dark theme colors
                          title: "Cancella Vitello",
                        },
                        React.createElement(Trash2Icon, { size: 20, className: "text-red-500" })
                      )
                    )
                  )
                )
              : React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "td",
                    { colSpan: "9", className: "py-6 text-center text-gray-500" }, // Adjusted colspan for new column
                    "Nessun vitello aggiunto. Aggiungine uno sopra!"
                  )
                )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-col md:flex-row gap-6 mb-6" },
        React.createElement(
          "div",
          { className: "flex-1 p-5 border border-gray-600 rounded-lg shadow-md bg-gray-700" }, // Set default dark theme colors
          React.createElement("h3", { className: "text-lg font-bold text-blue-300 mb-2 text-center" }, "Dose Totale Giornaliera"), // Set default dark theme colors
          React.createElement(
            "p",
            { className: "whitespace-pre-wrap text-center font-medium text-blue-400" }, // Set default dark theme colors
            "Latte: ",
            totals.latte.toFixed(2),
            " L ",
            React.createElement("br", null),
            "Acqua: ",
            totals.acqua.toFixed(2),
            " L ",
            React.createElement("br", null),
            "Polvere di latte: ",
            totals.polvere.toFixed(2),
            " kg"
          )
        ),
        React.createElement(
          "div",
          { className: "flex-1 p-5 border border-gray-600 rounded-lg shadow-md bg-gray-700" }, // Set default dark theme colors
          React.createElement("h3", { className: "text-lg font-bold text-blue-300 mb-2 text-center" }, "Dose Totale per Pasto"), // Set default dark theme colors
          React.createElement(
            "p",
            { className: "whitespace-pre-wrap text-center font-medium text-blue-400" }, // Set default dark theme colors
            "Latte: ",
            totals.lattePasto.toFixed(2),
            " L ",
            React.createElement("br", null),
            "Acqua: ",
            totals.acquaPasto.toFixed(2),
            " L ",
            React.createElement("br", null),
            "Polvere di latte: ",
            totals.polverePastoTotal.toFixed(2),
            " kg ",
            React.createElement("br", null),
            "(per pasto in media)"
          )
        ),
        React.createElement(
          "div",
          { className: "flex-1 p-5 border border-gray-600 rounded-lg shadow-md bg-gray-700" }, // Set default dark theme colors
          React.createElement("h3", { className: "text-lg font-bold text-green-300 mb-2 text-center" }, "Requisito Totale Polvere di Latte per Svezzamento"), // Set default dark theme colors
          React.createElement(
            "p",
            { className: "text-center font-medium text-green-400" }, // Set default dark theme colors
            "Totale kg polvere di latte necessaria da oggi: ",
            totalKgWeaningFromToday.toFixed(2),
            " kg"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-600" }, // Set default dark theme colors
        React.createElement(
          "div",
          { className: "flex items-center space-x-3" },
          React.createElement(
            "button",
            {
              onClick: () => setShowGlobalSettingsModal(true),
              className: "flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200 shadow-md",
            },
            React.createElement(SettingsIcon, { size: 20, className: "mr-2" }),
            " Impostazioni Globali"
          ),
          React.createElement(
            "button",
            {
              onClick: () => setShowImportExportModal(true),
              className: "flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200 shadow-md",
            },
            React.createElement(HardDriveIcon, { size: 20, className: "mr-2" }),
            " Importa/Esporta Dati"
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center space-x-3 ml-auto" },
          React.createElement("p", { className: "text-sm font-semibold text-gray-400" }, currentClock),
          React.createElement(
            "button",
            {
              onClick: () => setShowAboutModal(true),
              className: "flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 shadow-md ml-4",
              style: { width: '32px', height: '32px', minWidth: '32px', minHeight: '32px', fontSize: '16px', lineHeight: '1' }
            },
            React.createElement('span', { style: { fontWeight: 'bold', fontSize: '18px', display: 'block', width: '100%', textAlign: 'center' } }, 'i')
          )
        )
      ),
      showAboutModal && React.createElement(AboutModal, { onClose: () => setShowAboutModal(false) })
    )
  );
};

// Render the App component into the DOM
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error('ERROR: Element with ID "root" not found in the DOM. Ensure your index.html has <div id="root"></div>.');
    return;
  }

  if (typeof React === 'undefined') {
    console.error('ERROR: React is not defined. Ensure react.production.min.js is loaded BEFORE vitelli.js.');
    return;
  }

  if (typeof ReactDOM === 'undefined') {
    console.error('ERROR: ReactDOM is not defined. Ensure react-dom.production.min.js is loaded BEFORE vitelli.js.');
    return;
  }

  if (typeof App === 'undefined') {
    console.error('ERROR: The App component is not defined. This usually means vitelli.js is loaded incorrectly or there\'s a syntax error preventing its definition.');
    return;
  } else {
  }

  try {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(App, null));
  } catch (renderError) {
    console.error('FATAL ERROR: Failed to render React App.', renderError);
    container.innerHTML = '<div style="color: red; text-align: center; margin-top: 50px;">Errore critico durante il caricamento dell\'applicazione. Controlla la console per i dettagli.</div>';
  }
});
