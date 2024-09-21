import { CIRCUITS } from './mocks/mocks.js'
import { React, useState } from 'react';
import { Container, Row, Col, Button, Dropdown, Modal, Form, CloseButton, Image } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import IMAGES_components from './images/images.jsx';
import './App.css';
import { Home, CarPartPage } from './Components/Home.jsx';

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

  
  const changeComponent = (component, id, name) => {
    let newCircuit = null
    let oldLevel = null

    setCircuit( prevCircuit => {
      newCircuit = { ...prevCircuit }; // Copia immutabile di prevCircuit

      if (!newCircuit.components) {
        newCircuit.components = {
          freni: {id: null, name: ""},
          cambio: {id: null, name: ""},
          alettonePosteriore: {id: null, name: ""},
          alettoneAnteriore: {id: null, name: ""},
          sospensioni: {id: null, name: ""},
          motore: {id: null, name: ""}
        };
      }

      newCircuit.components[component] = { ...newCircuit[component], id: id, name: name };
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
    <Container>
      <Routes>
        <Route path="/f1-clash/" element={<Home levels={levels} setLevels={setLevels} 
            level={level} setLevel={setLevel} circuit={circuit} setCircuit={setCircuit}
        />} />
        <Route path="/f1-clash/car-setup/:part" element={<CarPartPage changeComponent={changeComponent}/>} />  
        <Route path="/f1-clash/driver-setup/:driver" element={<div/>} />  

      </Routes>
    </Container>
  )
  
}

export default App
