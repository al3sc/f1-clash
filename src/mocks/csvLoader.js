import Papa from 'papaparse';

// Funzione per caricare e analizzare un file CSV
export async function loadCsvData(fileName) {
  try {
    const response = await fetch(fileName);
    if (!response.ok) {
      throw new Error("Errore nel caricamento del file CSV");
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,        // Interpreta l'intestazione come chiavi degli oggetti
        skipEmptyLines: true, // Salta le righe vuote
        complete: (result) => {
          resolve(result.data);  // Restituisce i dati quando il parsing è completo
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  } catch (error) {
    console.error("Errore nel caricamento del file CSV:", error);
    throw error;
  }
}
