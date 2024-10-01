import { React, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Dropdown, Modal, Form, CloseButton, Image } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Home, CarPartPage } from './Components/Home.jsx';

import { CsvLoader } from './Components/inputs_test.jsx'
import { loadCsvData } from './mocks/csvLoader.js';

function App() {
  const [levels, setLevels] = useState([
    { name: "Junior",
      circuits: []
    },
    { name: "Challenger",
      circuits: []
    },
    { name: "Contender",
      circuits: []
    },
    { name: "Champion",
      circuits: []
    }
  ])

  const [level, setLevel] = useState(levels[0])
  const [circuit, setCircuit] = useState(level.circuits.length!==0 ? level.circuits[0] : null)

  const [CIRCUITS, setCIRCUITS] = useState([])
  const [COMPONENTS, setCOMPONENTS] = useState([])
  const [DRIVERS, setDRIVERS] = useState([])

  // loading all data ( circuits, components, drivers )
  useEffect(() => {
    //loading circuits
    loadCsvData("circuits.csv")
      .then( x => {
        setCIRCUITS(x)
      })
      .catch (error => {
        console.error("Not able to load Circuits data: ", error)
      })
    
    //loading components
    loadCsvData("components.csv")
      .then( x => {
        setCOMPONENTS(x)
      })
      .catch (error => {
        console.error("Not able to load Components data: ", error)
      })
  }, [])

  
  const changeComponent = (component, id, name) => {
    let newCircuit = null
    let oldLevel = null

    setCircuit( prevCircuit => {
      newCircuit = { ...prevCircuit }; // Copia immutabile di prevCircuit

      if (!newCircuit.components) {
        newCircuit.components = {
          freni: {id: null, Name: ""},
          cambio: {id: null, Name: ""},
          alettonePosteriore: {id: null, Name: ""},
          alettoneAnteriore: {id: null, Name: ""},
          sospensioni: {id: null, Name: ""},
          motore: {id: null, Name: ""}
        };
      }

      const foundComponent = COMPONENTS.find( x => x.id === id)

      newCircuit.components[component] = { ...newCircuit[component], ...foundComponent };
      return newCircuit
    })

    setLevel( prevLevel => {
      oldLevel = {...prevLevel}
      return {...prevLevel, circuits: prevLevel.circuits.map( x => {
        if(x.id === circuit.id) {
          return newCircuit
        }
        return x
      })}
    })

    setLevels( prevLevels => {
      return prevLevels.map( x => {
        if(x.name === level.name) {
          return {...level, circuits: level.circuits.map( y => {
            if(y.id === circuit.id) {
              return newCircuit
            }
            return y
          })}
        }
        return x
      })
    })


  }

  return (
    <Container fluid className="main-container">
      <Routes>
        <Route path="/f1-clash/" element={<Home levels={levels} setLevels={setLevels} 
            level={level} setLevel={setLevel} circuit={circuit} setCircuit={setCircuit}
            COMPONENTS={COMPONENTS} CIRCUITS={CIRCUITS} DRIVERS={DRIVERS}
        />} />
        <Route path="/f1-clash/car-setup/:part" element={<CarPartPage changeComponent={changeComponent} COMPONENTS={COMPONENTS}/>} />  
        <Route path="/f1-clash/driver-setup/:driver" element={<div/>} />  
        <Route path="/f1-clash/all-components" element={<CsvLoader fileName={'components.csv'}/>} />  
        <Route path="/f1-clash/all-drivers" element={<CsvLoader fileName={'drivers.csv'}/>} />  
        <Route path="/f1-clash/all-circuits" element={<CsvLoader fileName={'circuits.csv'}/>} />  

      </Routes>
    </Container>
  )
  
}

export default App
