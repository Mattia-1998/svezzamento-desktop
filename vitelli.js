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
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte in Polvere / G."),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte / pasto"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua / pasto"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte in Polvere / Pasto"),
              React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Pasti"),
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

  // Funzione per aggiungere una nuova settimana
  const addWeek = () => {
    setSettings((prevSettings) => {
      const lastWeek = prevSettings[prevSettings.length - 1];
      const newSettimana = lastWeek ? lastWeek.settimana + 1 : 1;
      const newWeek = {
        settimana: newSettimana,
        dose_kg: 0, // Default to 0 kg/week for new entries
        descrizione: `Settimana ${newSettimana}`,
        pasti: '2', // Default to 2 meals
        concentrazione_percentuale: '10.0', // Default to 10% concentration
        litri_giorno_input: '0.00', // Default to 0 liters/day for input
      };
      return [...prevSettings, newWeek];
    });
  };

  // Funzione per rimuovere l'ultima settimana
  const removeWeek = () => {
    setSettings((prevSettings) => {
      if (prevSettings.length > 1) { // Ensure at least one week remains
        return prevSettings.slice(0, prevSettings.length - 1);
      }
      return prevSettings; // Do not remove if only one week exists
    });
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
      { className: "mb-4 flex justify-between items-center" },
      React.createElement(
        "div",
        { className: "flex space-x-2" },
        React.createElement(
          "button",
          {
            onClick: addWeek,
            className: "px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 text-sm",
          },
          "Aggiungi Settimana"
        ),
        React.createElement(
          "button",
          {
            onClick: removeWeek,
            className: "px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 text-sm",
            disabled: settings.length <= 1, // Disable if only one week remains
          },
          "Rimuovi Ultima Settimana"
        )
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
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Settimana"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Litri al Giorno (L)"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Pasti"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Concentrazione (%)"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte Giornaliero"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua al Giorno"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte in Polvere / Giorno"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte per pasto"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua per Pasto"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte in Polvere / Pasto")
          )
        ),
        React.createElement(
          "tbody",
          null,
          settings.map((item, index) => {
            const { latteGiornaliero, acquaGiornaliera, polvereGiornaliera, lattePerPasto, acquaPerPasto, polverePerPasto, } = calculateRowDetails(item);
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
        { onClick: handleSave, className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200", },
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
          if (calfData.milk_type === 'cow_milk') {
            // If the calf is set to cow milk mode
            initialDailyLiters = (item.dose_kg || 0) / 7; // Here, dose_kg represents weekly cow milk liters
          } else {
            // Default or if powdered milk
            const initialDailyPowderKg = (item.dose_kg || 0) / 7;
            initialDailyLiters = initialDailyPowderKg * (100 / (item.concentrazione_percentuale || 10.0));
          }
          return {
            ...item,
            litri_giorno_input: isNaN(initialDailyLiters) ? '0.00' : initialDailyLiters.toFixed(2),
            pasti: String(item.pasti || 1),
            concentrazione_percentuale: isNaN(item.concentrazione_percentuale) ? '10.0' : item.concentrazione_percentuale.toFixed(1),
          };
        })
      );
    }
  }, [calfData, globalConfig.latte_settimanale]);

  const updateSettingField = (index, field, value) => {
    setSettings((prevSettings) => prevSettings.map((item, i) => {
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

  // Funzione per aggiungere una nuova settimana alle impostazioni individuali
  const addIndividualWeek = () => {
    setSettings((prevSettings) => {
      const lastWeek = prevSettings[prevSettings.length - 1];
      const newSettimana = lastWeek ? lastWeek.settimana + 1 : 1;
      const newWeek = {
        settimana: newSettimana,
        dose_kg: 0, // Default to 0 kg/week or liters/week
        descrizione: `Settimana ${newSettimana}`,
        pasti: '2', // Default to 2 meals
        concentrazione_percentuale: currentMilkType === 'cow_milk' ? 'N/A' : '10.0', // N/A for cow milk
        litri_giorno_input: '0.00', // Default to 0 liters/day for input
      };
      return [...prevSettings, newWeek];
    });
  };

  // Funzione per rimuovere l'ultima settimana dalle impostazioni individuali
  const removeIndividualWeek = () => {
    setSettings((prevSettings) => {
      if (prevSettings.length > 1) { // Ensure at least one week remains
        return prevSettings.slice(0, prevSettings.length - 1);
      }
      return prevSettings; // Do not remove if only one week exists
    });
  };

  const handleSave = () => {
    const updatedIndividualCalfSettings = settings.map((item) => {
      if (currentMilkType === 'cow_milk') {
        // For cow milk, dose_kg directly stores weekly liters
        const litriGiornalieri = parseFloat(item.litri_giorno_input) || 0;
        return {
          settimana: item.settimana,
          dose_kg: litriGiornalieri * 7, // Store weekly liters
          descrizione: item.descrizione,
          pasti: parseInt(item.pasti) || 2,
          concentrazione_percentuale: 'N/A', // Not applicable
        };
      } else {
        // For powdered milk
        const { polvereGiornaliera } = calculateRowDetails(item, false); // Pass false for powdered milk mode
        return {
          settimana: item.settimana,
          dose_kg: polvereGiornaliera * 7, // Convert daily powder to weekly
          descrizione: item.descrizione,
          pasti: parseInt(item.pasti) || 2,
          concentrazione_percentuale: parseFloat(item.concentrazione_percentuale) || 10.0,
        };
      }
    });
    onSaveIndividualCalfSettings(calfData.matricola, updatedIndividualCalfSettings, currentMilkType);
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
      { className: "mb-4 flex justify-between items-center" },
      React.createElement(
        "div",
        { className: "flex space-x-2" },
        React.createElement(
          "button",
          {
            onClick: addIndividualWeek,
            className: "px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 text-sm",
          },
          "Aggiungi Settimana"
        ),
        React.createElement(
          "button",
          {
            onClick: removeIndividualWeek,
            className: "px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 text-sm",
            disabled: settings.length <= 1, // Disable if only one week remains
          },
          "Rimuovi Ultima Settimana"
        )
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
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Settimana"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Litri al Giorno (L)"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Pasti"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Concentrazione (%)"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte Giornaliero"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua al Giorno"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte in Polvere / Giorno"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte per pasto"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Acqua per Pasto"),
            React.createElement("th", { className: "py-2 px-3 text-center border-b" }, "Latte in Polvere / Pasto")
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
            } = calculateRowDetails(item, isCowMilkModeActive);

            return React.createElement(
              "tr",
              { key: item.settimana, className: "border-b border-gray-600" }, // Changed to dark mode border
              React.createElement("td", { className: "py-2 px-3 text-center" }, "Settimana ", item.settimana),
              React.createElement(
                "td",
                { className: "py-2 px-3 text-center" },
                React.createElement("input", {
                  type: "text", // Changed from number to text
                  className: `w-20 p-1 border rounded text-center bg-gray-600 text-gray-100 appearance-none [appearance:textfield]`, // Added Tailwind classes
                  value: item.litri_giorno_input, // Value is now a string
                  onChange: (e) => updateSettingField(index, "litri_giorno_input", e.target.value),
                  // Disabled based on milk type is handled by the overall modal logic for cow milk
                })
              ),
              React.createElement(
                "td",
                { className: "py-2 px-3 text-center" },
                React.createElement("input", {
                  type: "text", // Changed from number to text
                  className: `w-16 p-1 border rounded text-center bg-gray-600 text-gray-100 appearance-none [appearance:textfield]`, // Added Tailwind classes
                  value: item.pasti, // Value is now a string
                  onChange: (e) => updateSettingField(index, "pasti", e.target.value),
                  disabled: isCowMilkModeActive, // Only disable if cow milk mode
                })
              ),
              React.createElement(
                "td",
                { className: "py-2 px-3 text-center" },
                React.createElement("input", {
                  type: "text", // Changed from number to text
                  className: `w-16 p-1 border rounded text-center bg-gray-600 text-gray-100 appearance-none [appearance:textfield] ${isCowMilkModeActive ? 'bg-gray-500 cursor-not-allowed' : ''}`, // Added Tailwind classes and disabled styling
                  value: item.concentrazione_percentuale, // Value is now a string
                  onChange: (e) => updateSettingField(index, "concentrazione_percentuale", e.target.value),
                  disabled: isCowMilkModeActive,
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
      !isUsingGlobalDefaults && // Mostra il pulsante di reset solo se le impostazioni non sono già quelle globali di default
      React.createElement(
        "button",
        {
          onClick: handleReset,
          className: "px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200",
        },
        "Ripristina Impostazioni Globali"
      ),
      React.createElement(
        "button",
        {
          onClick: handleSave,
          className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200",
        },
        "Salva Impostazioni Individuali"
      )
    )
  );
};


// Componente per la finestra di Importa/Esporta
const ImportExportModal = ({ show, onClose, onRefreshData }) => { // Added onRefreshData prop
  const handleExport = async () => {
    try {
      const response = await window.electronAPI.exportAllDataZip();
      if (response.success) {
        const successModal = document.createElement('div');
        successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        successModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4">Esportazione Completata</h3>
            <p class="mb-6">Backup creato con successo in: ${response.filePath}</p>
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
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Esportazione</h3>
            <p class="mb-6">Errore durante la creazione del backup: ${response.error}</p>
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
    } catch (error) {
      console.error("Errore durante la chiamata exportAllDataZip:", error);
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Esportazione</h3>
          <p class="mb-6">Errore generico durante l'esportazione: ${error.message}</p>
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

  const handleImport = async () => {
    try {
      const response = await window.electronAPI.importDataFromFile();
      if (response.success) {
        const successModal = document.createElement('div');
        successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        successModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4">Importazione Completata</h3>
            <p class="mb-6">${response.message}</p>
            <div class="flex justify-end">
              <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(successModal);
        document.getElementById('closeSuccessModal').onclick = () => {
          document.body.removeChild(successModal);
          onRefreshData(); // Trigger data refresh in App component
        };
      } else {
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Importazione</h3>
            <p class="mb-6">Errore durante l'importazione: ${response.error || response.message}</p>
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
    } catch (error) {
      console.error("Errore durante la chiamata importDataFromFile:", error);
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      errorModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4 text-red-400">Errore Importazione</h3>
          <p class="mb-6">Errore generico durante l'importazione: ${error.message}</p>
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


  return React.createElement(
    Modal,
    { show: show, onClose: onClose, title: "Importa/Esporta Dati" },
    React.createElement(
      "div",
      { className: "flex flex-col space-y-6 text-gray-100" }, // Changed to dark mode text
      React.createElement("h3", { className: "text-lg font-semibold text-center" }, "Gestione Backup Dati"),
      React.createElement("p", { className: "text-center text-sm text-gray-300" }, "Esporta o importa i file di configurazione e i dati dei vitelli."), // Changed to dark mode text
      React.createElement(
        "div",
        { className: "flex flex-col space-y-4" },
        React.createElement("h4", { className: "font-semibold text-center" }, "Funzioni di Backup"),
        React.createElement(
          "button",
          {
            onClick: handleExport,
            className: "px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-200 flex items-center justify-center",
          },
          React.createElement(HardDriveIcon, { size: 18, className: "mr-2" }),
          " Esporta Backup (ZIP)"
        ),
        React.createElement(
          "button",
          {
            onClick: handleImport,
            className: "px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200 cursor-pointer text-center flex items-center justify-center",
          },
          React.createElement(HardDriveIcon, { size: 18, className: "mr-2" }),
          " Importa Backup (ZIP/JSON)"
        )
      )
    )
  );
};

// Componente per la finestra di opzioni di esportazione settimanale
const WeeklyScheduleOptionsModal = ({ show, onClose, onGenerate }) => {
  const [option, setOption] = React.useState('7days');
  const [numDays, setNumDays] = React.useState(7);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [contentOption, setContentOption] = React.useState('both'); // 'both', 'detailsOnly', 'totalsOnly'

  const handleGenerate = () => {
    if (option === 'xdays') {
      const parsedDays = parseInt(numDays, 10);
      if (isNaN(parsedDays) || parsedDays <= 0) {
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Input non valido</h3>
            <p class="mb-6">Inserisci un numero di giorni valido e maggiore di zero.</p>
            <div class="flex justify-end">
              <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        document.getElementById('closeErrorModal').onclick = () => document.body.removeChild(errorModal);
        return;
      }
    }
    if (option === 'daterange') {
      const startYYYYMMDD = parseDateToYYYYMMDD(startDate);
      const endYYYYMMDD = parseDateToYYYYMMDD(endDate);
      if (!startYYYYMMDD || !endYYYYMMDD) {
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Date non valide</h3>
            <p class="mb-6">Inserisci date valide nel formato gg/mm/aaaa.</p>
            <div class="flex justify-end">
              <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        document.getElementById('closeErrorModal').onclick = () => document.body.removeChild(errorModal);
        return;
      }
      const startDt = new Date(startYYYYMMDD);
      const endDt = new Date(endYYYYMMDD);
      if (startDt > endDt) {
        const errorModal = document.createElement('div');
        errorModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
        errorModal.innerHTML = `
          <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
            <h3 class="text-lg font-semibold mb-4 text-red-400">Intervallo non valido</h3>
            <p class="mb-6">La data di inizio non può essere successiva alla data di fine.</p>
            <div class="flex justify-end">
              <button id="closeErrorModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
            </div>
          </div>
        `;
        document.body.appendChild(errorModal);
        document.getElementById('closeErrorModal').onclick = () => document.body.removeChild(errorModal);
        return;
      }
    }

    onGenerate({ option, numDays, startDate, endDate, contentOption });
    onClose();
  };

  const radioBaseClasses = "form-radio h-5 w-5 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500";
  const labelBaseClasses = "ml-2 text-gray-200";
  const inputBaseClasses = "ml-4 p-2 border border-gray-700 rounded-md bg-gray-500 text-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed";

  return React.createElement(
    Modal,
    { show: show, onClose: onClose, title: "Opzioni Esportazione Programma Settimanale", maxWidthClass: 'max-w-lg' },
    React.createElement(
      "div",
      { className: "flex flex-col space-y-6 text-gray-100 p-4" },
      React.createElement(
        "div",
        { className: "flex items-center" },
        React.createElement("input", { type: "radio", id: "7days", name: "exportOption", value: "7days", checked: option === '7days', onChange: (e) => setOption(e.target.value), className: radioBaseClasses }),
        React.createElement("label", { htmlFor: "7days", className: labelBaseClasses }, "Salva i prossimi 7 giorni")
      ),
      React.createElement(
        "div",
        { className: "flex items-center" },
        React.createElement("input", { type: "radio", id: "xdays", name: "exportOption", value: "xdays", checked: option === 'xdays', onChange: (e) => setOption(e.target.value), className: radioBaseClasses }),
        React.createElement("label", { htmlFor: "xdays", className: labelBaseClasses }, "Salva i prossimi"),
        React.createElement("input", { type: "number", value: numDays, onChange: (e) => setNumDays(e.target.value), disabled: option !== 'xdays', className: `${inputBaseClasses} w-24 text-center` }),
        React.createElement("span", { className: "ml-2" }, "giorni")
      ),
      React.createElement(
        "div",
        { className: "flex flex-col space-y-2" },
        React.createElement("div", { className: "flex items-center" },
          React.createElement("input", { type: "radio", id: "daterange", name: "exportOption", value: "daterange", checked: option === 'daterange', onChange: (e) => setOption(e.target.value), className: radioBaseClasses }),
          React.createElement("label", { htmlFor: "daterange", className: labelBaseClasses }, "Salva da/a:")
        ),
        React.createElement("div", { className: "flex items-center pl-7 space-x-2" },
          React.createElement("label", { htmlFor: "startDate" }, "Da:"),
          React.createElement("input", {
            type: "date",
            id: "startDate",
            value: parseDateToYYYYMMDD(startDate) || '',
            onChange: (e) => {
              if (e.target.value) {
                const [y, m, d] = e.target.value.split('-');
                setStartDate(`${d}/${m}/${y}`);
              } else {
                setStartDate('');
              }
            },
            disabled: option !== 'daterange',
            className: `${inputBaseClasses} w-40`
          }),
          React.createElement("label", { htmlFor: "endDate" }, "A:"),
          React.createElement("input", { type: "date", id: "endDate", value: parseDateToYYYYMMDD(endDate) || '', onChange: (e) => {
              if (e.target.value) {
                const [y, m, d] = e.target.value.split('-');
                setEndDate(`${d}/${m}/${y}`);
              } else {
                setEndDate('');
              }
            }, disabled: option !== 'daterange', className: `${inputBaseClasses} w-40` })
        )
      ),
      React.createElement("hr", { className: "border-gray-600 my-2" }),
      React.createElement(
        "div",
        { className: "flex flex-col space-y-2" },
        React.createElement("label", { className: "font-semibold text-gray-200" }, "Contenuto del PDF:"),
        React.createElement(
          "div", { className: "flex items-center" },
          React.createElement("input", { type: "radio", id: "contentBoth", name: "contentOption", value: "both", checked: contentOption === 'both', onChange: (e) => setContentOption(e.target.value), className: radioBaseClasses }),
          React.createElement("label", { htmlFor: "contentBoth", className: labelBaseClasses }, "Dettagli e Riepilogo Totali")
        ),
        React.createElement(
          "div", { className: "flex items-center" },
          React.createElement("input", { type: "radio", id: "contentDetails", name: "contentOption", value: "detailsOnly", checked: contentOption === 'detailsOnly', onChange: (e) => setContentOption(e.target.value), className: radioBaseClasses }),
          React.createElement("label", { htmlFor: "contentDetails", className: labelBaseClasses }, "Solo Dettagli Vitelli")
        ),
        React.createElement(
          "div", { className: "flex items-center" },
          React.createElement("input", { type: "radio", id: "contentTotals", name: "contentOption", value: "totalsOnly", checked: contentOption === 'totalsOnly', onChange: (e) => setContentOption(e.target.value), className: radioBaseClasses }),
          React.createElement("label", { htmlFor: "contentTotals", className: labelBaseClasses }, "Solo Riepilogo Totali")
        )
      ),
      React.createElement("div", { className: "flex justify-end pt-4" },
        React.createElement("button", { onClick: handleGenerate, className: "px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 shadow-md" }, "Genera PDF")
      )
    )
  );
};

// Componente per la finestra di opzioni di esportazione e stampa
const ExportOptionsModal = ({ show, onClose, onExportPdf, onExportXlsx, onPrintWeekly }) => {
  const buttonBaseClasses = "flex items-center justify-center w-full px-4 py-3 text-white rounded-md transition duration-200 shadow-md text-base";

  return React.createElement(
    Modal,
    { show: show, onClose: onClose, title: "Opzioni di Esportazione e Stampa", maxWidthClass: 'max-w-md' },
    React.createElement(
      "div",
      { className: "flex flex-col space-y-4 p-4" },
      React.createElement(
        "button",
        {
          onClick: () => { onExportPdf(); onClose(); },
          className: `${buttonBaseClasses} bg-purple-500 hover:bg-purple-600`,
        },
        React.createElement(FileTextIcon, { size: 20, className: "mr-2" }),
        "Salva PDF (Tutti i Vitelli)"
      ),
      React.createElement(
        "button",
        {
          onClick: () => { onExportXlsx(); onClose(); },
          className: `${buttonBaseClasses} bg-teal-500 hover:bg-teal-600`,
        },
        React.createElement(FileSpreadsheetIcon, { size: 20, className: "mr-2" }),
        "Esporta in Excel (Tutti i Vitelli)"
      ),
      React.createElement("button", { onClick: onPrintWeekly, className: `${buttonBaseClasses} bg-cyan-500 hover:bg-cyan-600` }, React.createElement(PrinterIcon, { size: 20, className: "mr-2" }), "Stampa Programma Settimanale")
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
  const [appInfo, setAppInfo] = React.useState({ name: '', version: '' });
  const [showImportExportModal, setShowImportExportModal] = React.useState(false);
  const [showWeeklyScheduleOptionsModal, setShowWeeklyScheduleOptionsModal] = React.useState(false);
  const [showExportOptionsModal, setShowExportOptionsModal] = React.useState(false);
  // Rimosso lo stato `currentClock` da qui, poiché l'orologio è ora gestito direttamente nel DOM da index.html
  const [matricolaSortDirection, setMatricolaSortDirection] = React.useState('ascending');
  // Nuovo stato per la visibilità del menu di ordinamento
  const [showSortMenu, setShowSortMenu] = React.useState(false);
  const sortMenuRef = React.useRef(null);
  // e `useEffect` aggiorna direttamente l'elemento DOM.

  // vitelliDisplayedData: Derived state that includes calculated details for display
  const [vitelliDisplayedData, setVitelliDisplayedData] = React.useState([]);
  const [totals, setTotals] = React.useState({
    // Powdered milk totals
    lattePolvere: 0,
    acqua: 0,
    polvere: 0,
    // Cow milk totals
    latteVacca: 0,
    hasCowMilk: false,
    mealTotals: {
      1: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 },
      2: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 },
      3: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 }
    }
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
      doc.text(`Programma Svezzamento Vitello: ${dataToExport.matricola}`, doc.internal.pageSize.width / 2, 20, { align: 'center' });

      // Dati per la tabella dei dettagli
      const calfDetailsBody = [
        ['Matricola', dataToExport.matricola],
        ['Data di Nascita', dataToExport.data_nascita],
        ['Tipo di Latte', dataToExport.milk_type === 'cow_milk' ? 'Latte Vacca' : 'Latte in Polvere'],
        ['Giorni allo Svezzamento', dataToExport.calculated_details.giorni_mancanti_text || 'N/A']
      ];

      // Stile per la tabella dei dettagli
      const detailTableOptions = {
        theme: 'grid',
        headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' },
        bodyStyles: { fillColor: [236, 240, 241] },
        styles: { fontSize: 10, cellPadding: 3 },
        tableWidth: 'auto',
        columnStyles: { 0: { fontStyle: 'bold' } },
        margin: { left: 14 }
      };

      doc.autoTable({ ...detailTableOptions, head: [['Dettaglio Vitello', 'Valore']], body: calfDetailsBody, startY: 30 });

      let yPos = doc.autoTable.previous.finalY + 10;
      doc.setFontSize(12);
      doc.text("Programma Svezzamento Settimanale:", 14, yPos);
      yPos += 8;

      const scheduleHeaders = [
        ["Settimana", "Data Inizio", "Data Fine", "Dose Latte/G (L)", "Acqua / G.", "Latte in Polvere / G.", "Latte / pasto", "Acqua / pasto", "Polvere / Pasto", "Pasti/G", "Concentrazione (%)"]
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
        startY: yPos,
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
          5: { cellWidth: 25 }, // Latte in Polvere / G.
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

      let yPos = 30;

      // --- Riepilogo Dosi Totali ---
      const summaryHeaderStyle = { fillColor: [44, 62, 80], textColor: [255, 255, 255], fontStyle: 'bold' }; // Dark blue-gray
      const summaryBodyStyle = { fillColor: [236, 240, 241] }; // Light gray
      const tableOptions = {
        theme: 'grid',
        headStyles: summaryHeaderStyle,
        bodyStyles: summaryBodyStyle,
        styles: { fontSize: 9, cellPadding: 2 },
        tableWidth: 'auto',
        columnStyles: { 0: { fontStyle: 'bold' } },
      };

      // Dati per le tabelle di riepilogo
      const dailyTotalsBody = [];
      if (totals.lattePolvere > 0 || !totals.hasCowMilk) {
        dailyTotalsBody.push(['Latte in polvere (ricostituito)', `${totals.lattePolvere.toFixed(2)} L`]);
        dailyTotalsBody.push(['Acqua', `${totals.acqua.toFixed(2)} L`]);
        dailyTotalsBody.push(['Latte in Polvere', `${totals.polvere.toFixed(2)} kg`]);
      }
      if (totals.hasCowMilk) {
        dailyTotalsBody.push(['Latte di vacca', `${totals.latteVacca.toFixed(2)} L`]);
      }

      // Disegna le tabelle una sotto l'altra per garantire la visibilità
      doc.autoTable({
        ...tableOptions,
        head: [['Dosi Totali Giornaliere', 'Quantità']],
        body: dailyTotalsBody,
        startY: yPos,
        margin: { left: 14, right: 14 }
      });

      yPos = doc.autoTable.previous.finalY + 5; // Aggiunge un piccolo spazio

      if (totals.mealTotals) {
        doc.setFontSize(12);
        doc.text("Dosi Totali per Singolo Pasto", 14, yPos);
        yPos += 7;

        Object.keys(totals.mealTotals).forEach(mealNumber => {
            const meal = totals.mealTotals[mealNumber];
            if (meal.lattePolvere > 0 || meal.latteVacca > 0) {
                if (yPos > doc.internal.pageSize.height - 40) {
                    doc.addPage();
                    yPos = 20;
                }
                const mealBody = [];
                if (meal.lattePolvere > 0) {
                    mealBody.push(['Latte Polvere (ricost.)', `${meal.lattePolvere.toFixed(2)} L`]);
                    mealBody.push(['Acqua', `${meal.acqua.toFixed(2)} L`]);
                    mealBody.push(['Polvere', `${meal.polvere.toFixed(2)} kg`]);
                }
                if (meal.latteVacca > 0) {
                    mealBody.push(['Latte Vacca', `${meal.latteVacca.toFixed(2)} L`]);
                }

                doc.autoTable({
                    startY: yPos,
                    head: [[`Totale Pasto ${mealNumber}`]],
                    body: mealBody,
                    theme: 'grid',
                    headStyles: { fillColor: [96, 125, 139], fontSize: 9, fontStyle: 'bold' },
                    bodyStyles: { fontSize: 9 },
                    styles: { cellPadding: 2, valign: 'middle' },
                    columnStyles: { 0: { fontStyle: 'bold' } },
                    margin: { left: 14, right: 14 }
                });
                yPos = doc.autoTable.previous.finalY + 5;
            }
        });
      }
      yPos = Math.max(yPos, doc.autoTable.previous.finalY); // Ensure space before next table

      // Tabella per il fabbisogno totale
      doc.autoTable({
        ...tableOptions,
        head: [['Fabbisogno Totale Latte in Polvere', 'Quantità']],
        body: [['Da oggi in poi', `${totalKgWeaningFromToday.toFixed(2)} kg`]],
        startY: yPos + 5,
        margin: { left: 14, right: 14 }
      });


      const headers = [
        [
          { content: 'Matricola', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Data di Nascita', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Tipo Latte', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Periodo Svezzamento', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
          { content: 'Pasti/G', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } }, // Nuova colonna
          { content: 'Dosi Totali Giornaliere', colSpan: 3, styles: { halign: 'center' } },
          { content: 'Dosi per Pasto', colSpan: 3, styles: { halign: 'center' } },
          { content: 'Giorni allo Svezzamento', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } }
        ],
        [
          'Latte (L)', 'Acqua (L)', 'Polvere (kg)',
          'Latte (L)', 'Acqua (L)', 'Polvere (kg)'
        ]
      ];
      const body = vitelliDisplayedData.map(calf => [ // Use vitelliDisplayedData here
        calf.matricola,
        calf.data_nascita,
        calf.milk_type === 'cow_milk' ? 'Vacca' : 'Polvere', // Display milk type in table
        calf.calculated_details.dates_range_text || '',
        calf.calculated_details.pasti, // Aggiunto il numero di pasti
        calf.calculated_details.latte_giornaliero.toFixed(2),
        calf.calculated_details.acqua_giornaliera.toFixed(2),
        calf.calculated_details.polvere_giornaliera.toFixed(2),
        calf.calculated_details.latte_per_pasto.toFixed(2),
        calf.calculated_details.acqua_per_pasto.toFixed(2),
        calf.calculated_details.polvere_per_pasto.toFixed(2),
        calf.calculated_details.giorni_mancanti_text || ''
      ]);

      doc.autoTable({
        startY: yPos + 10,
        head: headers,
        body: body,
        theme: 'grid',
        headStyles: headerStyle,
        bodyStyles: bodyStyle,
        styles: { fontSize: 7, cellPadding: 1.5 }, // Reduced font size and padding
        columnStyles: {
          0: { cellWidth: 22 },  // Matricola
          1: { cellWidth: 22 },  // Data di Nascita
          2: { cellWidth: 15 },  // Tipo Latte
          3: { cellWidth: 30 },  // Periodo Svezzamento
          4: { cellWidth: 15 },  // Pasti/G (Nuova)
          5: { cellWidth: 20 },  // Latte (L) Giorn.
          6: { cellWidth: 20 },  // Acqua (L) Giorn.
          7: { cellWidth: 20 },  // Polvere (kg) Giorn.
          8: { cellWidth: 20 },  // Latte (L) Pasto
          9: { cellWidth: 20 },  // Acqua (L) Pasto
          10: { cellWidth: 20 }, // Polvere (kg) Pasto
          11: { cellWidth: 25 }, // Giorni allo Svezzamento
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
        ["Settimana", "Data Inizio", "Data Fine", "Dose Latte/G (L)", "Acqua / G.", "Latte in Polvere / G.", "Latte / pasto", "Acqua / pasto", "Polvere / Pasto", "Pasti/G", "Concentrazione (%)"],
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

  // PDF Export Function for Weekly Schedule
  const exportWeeklyScheduleToPdf = React.useCallback((calvesToExport, options) => {
    if (!calvesToExport || calvesToExport.length === 0) {
      const infoModal = document.createElement('div');
      infoModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
      infoModal.innerHTML = `
        <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
          <h3 class="text-lg font-semibold mb-4">Informazione</h3>
          <p class="mb-6">Nessun vitello da esportare.</p>
          <div class="flex justify-end">
            <button id="closeInfoModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
          </div>
        </div>
      `;
      document.body.appendChild(infoModal);
      document.getElementById('closeInfoModal').onclick = () => {
        document.body.removeChild(infoModal);
      };
      return;
    }

    if (!window.jspdf || !window.jspdf.jsPDF) {
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
    const doc = new jsPDF('landscape', 'mm', 'a4');
    doc.setFont("helvetica");

    let yPos = 15;
    doc.setFontSize(18);
    doc.text(`Programma di Svezzamento Settimanale`, doc.internal.pageSize.width / 2, yPos, { align: 'center' });
    yPos += 15;

    let loopStartDate;
    let daysToExport;

    if (options.option === '7days') {
        loopStartDate = new Date();
        daysToExport = 7;
    } else if (options.option === 'xdays') {
        loopStartDate = new Date();
        daysToExport = parseInt(options.numDays, 10);
    } else { // 'daterange'
        const start = new Date(parseDateToYYYYMMDD(options.startDate));
        const end = new Date(parseDateToYYYYMMDD(options.endDate));
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        loopStartDate = start;
        const diffTime = Math.abs(end - start);
        daysToExport = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    loopStartDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < daysToExport; i++) {
      const currentDate = new Date(loopStartDate);
      currentDate.setDate(loopStartDate.getDate() + i);
      const currentDateString = formatDate(currentDate);

      if (i > 0) { // Add a gap between tables
        yPos += 10;
      }

      // Check if there's enough space for the next table header, if not, add a page
      if (yPos > doc.internal.pageSize.height - 40) {
        doc.addPage();
        yPos = 15;
      }

      doc.setFontSize(14);
      doc.text(`Giorno: ${currentDateString}`, 14, yPos);
      yPos += 8;

      const tableData = calvesToExport.map(calf => {
          const calfConfig = (calf.individual_config && calf.individual_config.length > 0)
                             ? calf.individual_config
                             : config.latte_settimanale;
        
          const durataSvezzamentoGiorni = (calfConfig?.length || 0) * 7;
        
          const dNascitaStr = calf.data_nascita;
          if (!dNascitaStr) return null;

          try {
              const dataNascitaYYYYMMDD = parseDateToYYYYMMDD(dNascitaStr);
              if (!dataNascitaYYYYMMDD) throw new Error("Invalid date format");
              const dataNascitaDt = new Date(dataNascitaYYYYMMDD);
              if (isNaN(dataNascitaDt.getTime())) throw new Error("Invalid date object");
              dataNascitaDt.setHours(0, 0, 0, 0);

              const diffTime = Math.abs(currentDate - dataNascitaDt);
              const giorniPassati = Math.floor(diffTime / (1000 * 60 * 60 * 24));

              if (giorniPassati >= durataSvezzamentoGiorni) return null;

              const settimanaIdx = Math.floor(giorniPassati / 7);
              if (settimanaIdx >= calfConfig.length) return null;
          
              const currentWeekConfig = calfConfig[settimanaIdx];
              const isCowMilk = calf.milk_type === 'cow_milk';
              const pasti = currentWeekConfig.pasti || 2;

              let latteGiornaliero = 0, acquaGiornaliera = 0, polvereGiornaliera = 0;
              let lattePerPasto = 0, acquaPerPasto = 0, polverePerPasto = 0;

              if (isCowMilk) {
                  latteGiornaliero = (currentWeekConfig.dose_kg || 0) / 7;
                  lattePerPasto = pasti > 0 ? latteGiornaliero / pasti : 0;
              } else {
                  const concentrazionePercentuale = currentWeekConfig.concentrazione_percentuale || 10.0;
                  polvereGiornaliera = (currentWeekConfig.dose_kg || 0) / 7;
                  latteGiornaliero = polvereGiornaliera * (100 / concentrazionePercentuale);
                  acquaGiornaliera = latteGiornaliero - polvereGiornaliera;
              
                  lattePerPasto = pasti > 0 ? latteGiornaliero / pasti : 0;
                  acquaPerPasto = pasti > 0 ? acquaGiornaliera / pasti : 0;
                  polverePerPasto = pasti > 0 ? polvereGiornaliera / pasti : 0;
              }

              return [
                  calf.matricola,
                  isCowMilk ? 'Vacca' : 'Polvere',
                  pasti,
                  lattePerPasto.toFixed(2),
                  acquaPerPasto.toFixed(2),
                  polverePerPasto.toFixed(2),
                  latteGiornaliero.toFixed(2),
                  acquaGiornaliera.toFixed(2),
                  polvereGiornaliera.toFixed(2),
                  currentWeekConfig?.descrizione || ''
              ];
          } catch (e) {
              console.error(`Errore calcolo per vitello ${calf.matricola} in data ${currentDateString}:`, e);
              return [calf.matricola, 'Errore', '-', '-', '-', '-', '-', '-', '-', '-'];
          }
      }).filter(row => row !== null);

      if (tableData.length > 0) {
        const totalsForDay = tableData.reduce((acc, row) => {
            const isCowMilk = row[1] === 'Vacca';
            const pasti = parseInt(row[2]) || 0;
            const lattePasto = parseFloat(row[3]) || 0;
            const acquaPasto = parseFloat(row[4]) || 0;
            const polverePasto = parseFloat(row[5]) || 0;
            const latteGiorno = parseFloat(row[6]) || 0;
            const acquaGiorno = parseFloat(row[7]) || 0;
            const polvereGiorno = parseFloat(row[8]) || 0;

            if (isCowMilk) {
                acc.cow.latteGiorno += latteGiorno;
            } else {
                acc.powder.latteGiorno += latteGiorno;
                acc.powder.acquaGiorno += acquaGiorno;
                acc.powder.polvereGiorno += polvereGiorno;
            }

            for (let i = 1; i <= pasti; i++) {
                if (acc.mealTotals[i]) {
                    if (isCowMilk) {
                        acc.mealTotals[i].latteVacca += lattePasto;
                    } else {
                        acc.mealTotals[i].lattePolvere += lattePasto;
                        acc.mealTotals[i].acqua += acquaPasto;
                        acc.mealTotals[i].polvere += polverePasto;
                    }
                }
            }
            return acc;
        }, {
            powder: { latteGiorno: 0, acquaGiorno: 0, polvereGiorno: 0 },
            cow: { latteGiorno: 0 },
            mealTotals: {
                1: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 },
                2: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 },
                3: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 }
            }
        });

        const hasPowder = totalsForDay.powder.latteGiorno > 0;
        const hasCow = totalsForDay.cow.latteGiorno > 0;

        if (options.contentOption === 'both' || options.contentOption === 'detailsOnly') {
            doc.autoTable({
                startY: yPos,
                margin: { left: 14, right: 14 },
                head: [["Matricola", "Tipo", "Pasti", "Latte/Pasto", "Acqua/Pasto", "Polvere/Pasto", "Latte/Giorno", "Acqua/Giorno", "Polvere/Giorno", "Descrizione"]],
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' },
                styles: { fontSize: 7, cellPadding: 1.5, valign: 'middle' },
                columnStyles: {
                    0: { cellWidth: 25 }, // Matricola
                    1: { cellWidth: 15 }, // Tipo
                    2: { cellWidth: 15 }, // Pasti
                    3: { cellWidth: 22 }, // Latte/Pasto
                    4: { cellWidth: 22 }, // Acqua/Pasto
                    5: { cellWidth: 22 }, // Polvere/Pasto
                    6: { cellWidth: 22 }, // Latte/Giorno
                    7: { cellWidth: 22 }, // Acqua/Giorno
                    8: { cellWidth: 22 }, // Polvere/Giorno
                    9: { cellWidth: 68 }  // Descrizione
                }
            });
            yPos = doc.autoTable.previous.finalY;
        }

        if (options.contentOption === 'both' || options.contentOption === 'totalsOnly') {
            if (hasPowder || hasCow) {
                // Controlla lo spazio per il riepilogo, aggiunge una nuova pagina se necessario
                if (yPos > doc.internal.pageSize.height - 35) {
                    doc.addPage();
                    yPos = 15;
                }
                yPos += 5;
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.text("Riepilogo Totali del Giorno:", 14, yPos);
                yPos += 2;

                const dailyBody = [];
                if (hasPowder) {
                    dailyBody.push(['Latte Polvere (ricost.)', `${totalsForDay.powder.latteGiorno.toFixed(2)} L`]);
                    dailyBody.push(['Acqua', `${totalsForDay.powder.acquaGiorno.toFixed(2)} L`]);
                    dailyBody.push(['Polvere', `${totalsForDay.powder.polvereGiorno.toFixed(2)} kg`]);
                }
                if (hasCow) {
                    dailyBody.push(['Latte Vacca', `${totalsForDay.cow.latteGiorno.toFixed(2)} L`]);
                }

                doc.autoTable({
                    startY: yPos,
                    head: [['Dose Giornaliera Totale', 'Quantità']],
                    body: dailyBody,
                    theme: 'grid',
                    headStyles: { fillColor: [96, 125, 139], fontSize: 8, fontStyle: 'bold' },
                    bodyStyles: { fontSize: 8 },
                    styles: { cellPadding: 1.5, valign: 'middle' },
                    columnStyles: { 0: { fontStyle: 'bold' } },
                    margin: { left: 14, right: 14 },
                    didDrawPage: (data) => { yPos = data.cursor.y; }
                });
                yPos = doc.autoTable.previous.finalY + 5;

                // Now the per-meal totals
                Object.keys(totalsForDay.mealTotals).forEach(mealNumber => {
                    const meal = totalsForDay.mealTotals[mealNumber];
                    if (meal.lattePolvere > 0 || meal.latteVacca > 0) {
                        if (yPos > doc.internal.pageSize.height - 30) {
                            doc.addPage();
                            yPos = 15;
                        }
                        
                        const mealBody = [];
                        if (meal.lattePolvere > 0) {
                            mealBody.push(['Latte Polvere (ricost.)', `${meal.lattePolvere.toFixed(2)} L`]);
                            mealBody.push(['Acqua', `${meal.acqua.toFixed(2)} L`]);
                            mealBody.push(['Polvere', `${meal.polvere.toFixed(2)} kg`]);
                        }
                        if (meal.latteVacca > 0) {
                            mealBody.push(['Latte Vacca', `${meal.latteVacca.toFixed(2)} L`]);
                        }

                        doc.autoTable({
                            startY: yPos,
                            head: [[`Totale Pasto ${mealNumber}`]],
                            body: mealBody,
                            theme: 'grid',
                            headStyles: { fillColor: [127, 140, 141], fontSize: 8, fontStyle: 'bold' },
                            bodyStyles: { fontSize: 8 },
                            styles: { cellPadding: 1.5, valign: 'middle' },
                            columnStyles: { 0: { fontStyle: 'bold' } },
                            margin: { left: 14, right: 14 },
                            didDrawPage: (data) => { yPos = data.cursor.y; }
                        });
                        yPos = doc.autoTable.previous.finalY + 2;
                    }
                });
            }
        }
      } else {
          if (options.contentOption === 'both' || options.contentOption === 'detailsOnly') {
              doc.setFontSize(10);
              doc.text("Nessun vitello in svezzamento per questo giorno.", 14, yPos);
              yPos += 10;
          }
      }
    }

    doc.save(`Programma_Svezzamento_Settimanale.pdf`);
    const successModal = document.createElement('div');
    successModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
    successModal.innerHTML = `
      <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-100">
        <h3 class="text-lg font-semibold mb-4">Esportazione PDF Completata</h3>
        <p class="mb-6">Programma settimanale salvato con successo.</p>
        <div class="flex justify-end">
          <button id="closeSuccessModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
        </div>
      </div>
    `;
    document.body.appendChild(successModal);
    document.getElementById('closeSuccessModal').onclick = () => {
      document.body.removeChild(successModal);
    };
  }, [config.latte_settimanale]);

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
    const fetchAppInfo = async () => {
      try {
        const info = await window.electronAPI.getAppInfo();
        setAppInfo(info);
      } catch (error) {
        console.error("Errore nel recuperare le informazioni dell'app:", error);
      }
    };

    fetchAppInfo();
  }, []);

  React.useEffect(() => {
    loadAllData();
  }, [loadAllData]); // Depend on loadAllData

  // Pure function to calculate details for calves and overall totals
  // This function does NOT modify state directly, it returns the calculated values.
  const calculateCalfDetailsAndTotals = React.useCallback((currentRawCalves, globalConfig) => {
    let totLattePolvereGiornaliero = 0.0;
    let totLatteVaccaGiornaliero = 0.0;
    let totAcquaGiornaliera = 0.0;
    let totPolvereGiornaliera = 0.0;
    const mealTotals = {
        1: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 },
        2: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 },
        3: { lattePolvere: 0, acqua: 0, polvere: 0, latteVacca: 0 }
    };

    let currentTotalKgWeaningFromToday = 0.0; // This will only sum powder remaining
    let hasCowMilkCalf = false;
    
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

      // Calcola la durata totale dello svezzamento dinamicamente in base alla configurazione
      const durataSvezzamentoGiorni = (calfConfig?.length || 0) * 7;

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

            const giorniAlloSvezzamento = durataSvezzamentoGiorni - giorniPassati;
            giorniMancantiText = giorniAlloSvezzamento > 0 ? `${giorniAlloSvezzamento} giorni` : "Svezzato";

            if (calfConfig && calfConfig.length > 0) {
              const settimaneIdx = Math.min(Math.floor(giorniPassati / 7), calfConfig.length - 1);
              const currentWeekConfig = calfConfig[settimaneIdx];

              const dataInizioSettimanaCorrente = new Date(dataDt);
              dataInizioSettimanaCorrente.setDate(dataDt.getDate() + settimaneIdx * 7);
              const dataFineSettimana = new Date(dataInizioSettimanaCorrente);
              dataFineSettimana.setDate(dataInizioSettimanaCorrente.getDate() + 6);
              datesRangeText = `${formatDate(dataInizioSettimanaCorrente)}\nA\n${formatDate(dataFineSettimana)}`;

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

                doseGiornalieraText = `Latte: ${latteGiornaliero.toFixed(2)} L\nAcqua: ${acquaGiornaliera.toFixed(2)} L\nLatte in Polvere: ${polvereGiornaliera.toFixed(2)} kg`;

                // Calculate remaining powder only for powdered milk calves
                let milkPerCalfRemaining = 0.0;
                const currentWeekIndex = Math.floor(giorniPassati / 7);
                const daysIntoCurrentWeek = giorniPassati % 7;
                const remainingDaysInCurrentWeek = 7 - daysIntoCurrentWeek;

                if (giorniPassati < durataSvezzamentoGiorni) {
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

              // Costruisce la stringa per la dose per pasto.
              // Dato che i pasti sono identici, mostriamo i dettagli di un singolo pasto per evitare ripetizioni.
              if (pasti > 0) {
                if (isCowMilk) {
                  dosePerPastoText = `Latte vacca: ${lattePerPasto.toFixed(2)} L`;
                } else {
                  dosePerPastoText = `Latte: ${lattePerPasto.toFixed(2)} L\nAcqua: ${acquaPerPasto.toFixed(2)} L\nPolvere: ${polverePerPastoValue.toFixed(2)} kg`;
                }
              } else {
                dosePerPastoText = "N/A";
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
      if (giorniPassati < durataSvezzamentoGiorni) {
        if (isCowMilk) {
            hasCowMilkCalf = true;
            totLatteVaccaGiornaliero += latteGiornaliero;
        } else {
            totLattePolvereGiornaliero += latteGiornaliero;
            totAcquaGiornaliera += acquaGiornaliera;
            totPolvereGiornaliera += polvereGiornaliera;
        }

        for (let i = 1; i <= pasti; i++) {
            if (mealTotals[i]) {
                if (isCowMilk) {
                    mealTotals[i].latteVacca += lattePerPasto;
                } else {
                    mealTotals[i].lattePolvere += lattePerPasto;
                    mealTotals[i].acqua += acquaPerPasto;
                    mealTotals[i].polvere += polverePerPastoValue;
                }
            }
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
            lattePolvere: totLattePolvereGiornaliero,
            latteVacca: totLatteVaccaGiornaliero,
            acqua: totAcquaGiornaliera,
            polvere: totPolvereGiornaliera,
            hasCowMilk: hasCowMilkCalf,
            mealTotals: mealTotals,
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
      setVitelliDisplayedData([]); // Clear display data
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

  // Hook per chiudere il menu a tendina quando si clicca all'esterno
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuRef]);

  // Sort by matricola (toggles direction)
  const sortByMatricola = () => {
    const sortedRawCalves = [...vitelliRawData].sort((a, b) => {
      const matricolaA = a.matricola || '';
      const matricolaB = b.matricola || '';

      const comparison = matricolaA.localeCompare(matricolaB, undefined, { numeric: true, sensitivity: 'base' });

      return matricolaSortDirection === 'ascending' ? comparison : comparison * -1;
    });

    // Toggle direction for the next click
    setMatricolaSortDirection(
      matricolaSortDirection === 'ascending' ? 'descending' : 'ascending'
    );

    // Save the sorted raw data, which will trigger the calculation useEffect
    saveCalfData(sortedRawCalves);
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

  // Handle generating the weekly schedule PDF from the options modal
  const handleGenerateWeeklySchedule = (options) => {
    exportWeeklyScheduleToPdf(vitelliDisplayedData, options);
  };

  // Update clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      const clockText = new Date().toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      // Aggiorna direttamente l'elemento DOM dell'orologio nel footer fisso
      const fixedClockElement = document.getElementById('fixedClockDisplay');
      if (fixedClockElement) {
        fixedClockElement.textContent = clockText;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return React.createElement(
    "div",
    { className: "min-h-screen p-4 font-sans antialiased bg-gray-800 text-gray-100" }, // Set default dark theme colors
    React.createElement(
      "div",
      { className: "container mx-auto p-6 bg-gray-700 rounded-lg shadow-xl" }, // Set default dark theme colors
      React.createElement("h1", { className: "text-3xl font-bold text-center mb-6 text-blue-400" }, "Svezzamento Vitelli"), // Set default dark theme colors
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
            className: "flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 shadow-md",
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
            className: "flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 shadow-md",
            title: "Ricalcola Dosi",
          },
          React.createElement(RefreshCcwIcon, { size: 20, className: "mr-2" }),
          " Ricalcola"
        )
      ),
      React.createElement(
        "div",
        { className: "flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-gray-600 rounded-md shadow-sm" }, // Modificato per allineare gli elementi ai lati
        React.createElement(
          "div",
          { className: "relative inline-block text-left", ref: sortMenuRef },
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              {
                type: "button",
                onClick: () => setShowSortMenu(prev => !prev),
                className: "inline-flex justify-center w-full rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-gray-600 text-sm font-medium text-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-indigo-500",
                id: "options-menu-button", "aria-expanded": "true", "aria-haspopup": "true"
              },
              "Ordina per...",
              React.createElement("svg", { className: "-mr-1 ml-2 h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                React.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" })
              )
            )
          ),
          showSortMenu && React.createElement(
            "div",
            { className: "origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-20", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "options-menu-button" },
            React.createElement(
              "div",
              { className: "py-1", role: "none" },
              React.createElement("button", { onClick: () => { sortByDate(true); setShowSortMenu(false); }, className: "w-full text-left flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-600", role: "menuitem" },
                React.createElement(SortAscIcon, { size: 16, className: "mr-3" }),
                "Data Crescente"
              ),
              React.createElement("button", { onClick: () => { sortByDate(false); setShowSortMenu(false); }, className: "w-full text-left flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-600", role: "menuitem" },
                React.createElement(SortDescIcon, { size: 16, className: "mr-3" }),
                "Data Decrescente"
              ),
              React.createElement("button", { onClick: () => { sortByMatricola(); setShowSortMenu(false); }, className: "w-full text-left flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-600", role: "menuitem" },
                matricolaSortDirection === 'ascending' ? React.createElement(SortAscIcon, { size: 16, className: "mr-3" }) : React.createElement(SortDescIcon, { size: 16, className: "mr-3" }),
                "Matricola"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-3" }, // Group for export/print buttons
          React.createElement("button", { onClick: () => setShowExportOptionsModal(true), className: "flex items-center px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-200 shadow-md" }, React.createElement(PrinterIcon, { size: 20, className: "mr-2" }), " Esporta / Stampa")
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
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Data di nascita"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Tipo Latte"),
              React.createElement("th", { className: "py-3 px-4 text-center border-b" }, "Da \u2192 A"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Dose Totale Giornaliera"),
              React.createElement("th", { className: "py-3 px-4 text-left border-b" }, "Dosi per Pasto"),
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
                    React.createElement("td", { className: "py-3 px-4" }, calf.milk_type === 'cow_milk' ? 'Vacca' : 'Polvere'),
                    React.createElement("td", { className: "py-3 px-4 whitespace-pre-wrap text-center" }, calf.calculated_details.dates_range_text || "N/A"),
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
            "div",
            { className: "text-center font-medium text-blue-400 space-y-1" }, // Rimosso whitespace-pre-wrap, aggiunto space-y
            React.createElement("p", null, `Latte in polvere (ricostituito): ${totals.lattePolvere.toFixed(2)} L`),
            React.createElement("p", null, `Acqua: ${totals.acqua.toFixed(2)} L`),
            React.createElement("p", null, `Latte in Polvere: ${totals.polvere.toFixed(2)} kg`),
            totals.hasCowMilk && React.createElement(React.Fragment, null, React.createElement("hr", { className: "my-2 border-gray-600" }), React.createElement("p", null, `Latte di vacca: ${totals.latteVacca.toFixed(2)} L`))
          )
        ),
        React.createElement(
          "div",
          { className: "flex-1 p-5 border border-gray-600 rounded-lg shadow-md bg-gray-700" }, // Set default dark theme colors
          React.createElement("h3", { className: "text-lg font-bold text-blue-300 mb-2 text-center" }, "Dose Totale per Pasto"), // Set default dark theme colors
          React.createElement(
            "div",
            { className: "space-y-3" },
            (() => {
              const areMealsEqual = (meal1, meal2) => {
                if (!meal1 || !meal2) return false;
                return (
                  Math.abs((meal1.lattePolvere || 0) - (meal2.lattePolvere || 0)) < 0.01 &&
                  Math.abs((meal1.acqua || 0) - (meal2.acqua || 0)) < 0.01 &&
                  Math.abs((meal1.polvere || 0) - (meal2.polvere || 0)) < 0.01 &&
                  Math.abs((meal1.latteVacca || 0) - (meal2.latteVacca || 0)) < 0.01
                );
              };

              const mealTotalsEntries = Object.entries(totals.mealTotals || {}).filter(
                ([_, meal]) => meal.lattePolvere > 0 || meal.latteVacca > 0 || meal.acqua > 0 || meal.polvere > 0
              );

              if (mealTotalsEntries.length === 0) {
                return null; // Non renderizzare nulla se non ci sono pasti
              }

              let allMealsAreSame = true;
              if (mealTotalsEntries.length > 1) {
                const firstMeal = mealTotalsEntries[0][1];
                for (let i = 1; i < mealTotalsEntries.length; i++) {
                  if (!areMealsEqual(firstMeal, mealTotalsEntries[i][1])) {
                    allMealsAreSame = false;
                    break;
                  }
                }
              }

              const MealDetails = ({ meal }) => React.createElement(
                React.Fragment,
                null,
                meal.lattePolvere > 0 && React.createElement("p", { className: "text-sm" }, `Latte (ricostituito): ${meal.lattePolvere.toFixed(2)} L`),
                meal.acqua > 0 && React.createElement("p", { className: "text-sm" }, `Acqua: ${meal.acqua.toFixed(2)} L`),
                meal.polvere > 0 && React.createElement("p", { className: "text-sm" }, `Polvere: ${meal.polvere.toFixed(2)} kg`),
                meal.latteVacca > 0 && React.createElement("p", { className: "text-sm" }, `Latte Vacca: ${meal.latteVacca.toFixed(2)} L`)
              );

              if (allMealsAreSame) {
                const meal = mealTotalsEntries[0][1];
                return React.createElement("div", { key: "single-meal", className: "text-center font-medium text-blue-400" }, React.createElement(MealDetails, { meal: meal }));
              } else {
                return mealTotalsEntries.map(([mealNumber, meal]) =>
                  React.createElement("div", { key: mealNumber, className: "text-center font-medium text-blue-400 border-t border-gray-600 pt-2 first:border-t-0" },
                    React.createElement("p", { className: "font-semibold text-md" }, `Pasto ${mealNumber}`),
                    React.createElement(MealDetails, { meal: meal })
                  )
                );
              }
            })()
          )
        ),
        React.createElement(
          "div",
          { className: "flex-1 p-5 border border-gray-600 rounded-lg shadow-md bg-gray-700" }, // Set default dark theme colors
          React.createElement("h3", { className: "text-lg font-bold text-green-300 mb-2 text-center" }, "Requisito Totale Latte in Polvere per Svezzamento"), // Set default dark theme colors
          React.createElement(
            "p",
            { className: "text-center font-medium text-green-400" },
            `Totale kg Latte in Polvere necessaria da oggi: ${totalKgWeaningFromToday.toFixed(2)} kg`
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
        // Nuovo contenitore per orologio e pulsante "Aiuto" allineati a destra
        React.createElement(
          "div",
          { className: "flex items-center space-x-3" },
          React.createElement(
            "div",
            { id: "fixedClockDisplay", className: "text-gray-200 text-sm font-mono" },
            // Il contenuto dell'orologio verrà aggiornato dal useEffect
          ),
          React.createElement(
            "button",
            {
              onClick: () => {
                const infoModal = document.createElement('div');
                infoModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]';
                infoModal.innerHTML = ` 
                  <div class="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md text-gray-100">
                    <h3 class="text-xl font-bold mb-4 text-blue-400">Svezzamento Vitelli</h3>
                    <div class="space-y-2 text-sm">
                      <p><strong>Versione:</strong> ${appInfo.version || 'N/A'}</p>
                      <p><strong>Sviluppatore:</strong> Giroldini Mattia</p>
                      <p><strong>Contatti:</strong> mattia.giroldini1998@gmail.com</p>
                      <p class="mt-4 pt-4 border-t border-gray-600"><strong>Copyright:</strong> © ${new Date().getFullYear()} Giroldini Mattia. Tutti i diritti riservati.</p>
                    </div>
                    <div class="flex justify-end mt-6">
                      <button id="closeInfoModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Chiudi</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(infoModal);
                document.getElementById('closeInfoModal').onclick = () => {
                  document.body.removeChild(infoModal);
                };
              },
              className: "w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 text-sm font-bold",
            },
            "i"
          )
        )
      )
    ),
    React.createElement(GlobalSettingsModal, {
      show: showGlobalSettingsModal,
      onClose: () => setShowGlobalSettingsModal(false),
      config: config,
      onSaveSettings: handleSaveGlobalSettings,
    }),
    selectedCalf &&
      React.createElement(CalfDetailModal, {
        show: showCalfDetailModal,
        onClose: () => setShowCalfDetailModal(false),
        calfData: selectedCalf,
        globalConfig: config,
        exportToPdf: exportDataToPdf, // Now correctly referencing the moved function
        exportToXlsx: exportToXlsx, // Now correctly referencing the moved function
      }),
    selectedCalf &&
      React.createElement(CalfSpecificSettingsModal, {
        show: showCalfSpecificSettingsModal,
        onClose: () => setShowCalfSpecificSettingsModal(false),
        calfData: selectedCalf,
        globalConfig: config,
        onSaveIndividualCalfSettings: handleSaveIndividualCalfSettings,
        onResetIndividualCalfSettings: handleResetIndividualCalfSettings,
      }),
    React.createElement(ImportExportModal, {
      show: showImportExportModal,
      onClose: () => setShowImportExportModal(false),
      onRefreshData: loadAllData, // Pass the function to refresh all data after import
    }),
    React.createElement(ExportOptionsModal, {
      show: showExportOptionsModal,
      onClose: () => setShowExportOptionsModal(false),
      onExportPdf: () => exportDataToPdf(null),
      onExportXlsx: () => exportToXlsx(null),
      onPrintWeekly: () => {
        setShowExportOptionsModal(false);
        setShowWeeklyScheduleOptionsModal(true);
      },
    }),
    React.createElement(WeeklyScheduleOptionsModal, {
      show: showWeeklyScheduleOptionsModal,
      onClose: () => setShowWeeklyScheduleOptionsModal(false),
      onGenerate: handleGenerateWeeklySchedule,
    })
  );
};

// Il codice di rendering finale è stato spostato in index.html
// Rimosso il blocco document.addEventListener('DOMContentLoaded', ...) da qui.
