import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function CsvLoader(props) {
  const { fileName } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(fileName)        // folder: public ("/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento del file CSV");
        }
        return response.text();
      })
      .then(csvText => {
        // analyze the CSV file
        Papa.parse(csvText, {
          header: true,  // Interpreta l'intestazione come chiavi degli oggetti nell'array
          skipEmptyLines: true, // Salta le righe vuote
          complete: (result) => {
            setData(result.data);  // Salva i dati nello stato
            console.log(result.data);  // Visualizza i dati in console
          },
        });
      })
      .catch(error => {
        console.error("Error loading CSV file:", error);
      });
  }, []);

  return (
    <div>
      <h2>CSV Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export { CsvLoader };
