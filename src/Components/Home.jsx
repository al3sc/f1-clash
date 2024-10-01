import { React, useState } from 'react';
import { Container, Row, Col, Button, Dropdown, Modal, Form, CloseButton, Image } from 'react-bootstrap';
import { CarComponent, DriverComponent } from './HomeComponents.jsx';
import { useNavigate, useParams } from 'react-router-dom';

import { IMAGES_circuits, IMAGES_icons } from '../images/images.jsx';

import '../App.css';

function Home(props) {
  const { levels, setLevels, level, setLevel, circuit, setCircuit, COMPONENTS, CIRCUITS } = props;

  const [showModal, setShowModal] = useState(false)
  const [newCircuitId, setNewCircuitId] = useState(-1)

  const handleChangeLevel = (newLevel) => {
    setCircuit(newLevel.circuits.length!==0 ? newLevel.circuits[0] : null)
    setLevel(newLevel)
  }

  const handleDeleteCircuit = (circuit) => {
    setLevels( prevLevels => prevLevels.map( x => (
      x.name === level.name
      ? { ...x, circuits: x.circuits.filter( x => x !== circuit) }
      : x
    )))
    setLevel( prevLevel =>  {
      const updatedLevel = levels.find(x => x.name === prevLevel.name);
      return {
        ...updatedLevel,
        circuits: updatedLevel.circuits.filter(c => c !== circuit)
      };
    })
    setCircuit(prevCircuit => {
      const updatedCircuits = level.circuits.filter(c => c !== circuit);
      return updatedCircuits.length !== 0 ? updatedCircuits[0] : null;
    });
  }

  const handleCloseModal = () => {
    setNewCircuitId(-1);
    setShowModal(false);
  }

  const handleSaveModal = () => {
    const newCircuit = CIRCUITS.find(x => x.id === newCircuitId)

    setLevels( prevLevels =>
      prevLevels.map( x =>
        x.name === level.name
          ? { name: x.name, circuits: [...x.circuits, newCircuit] }
          : x
      )
    );
    setLevel( prevLevel => ({ name: prevLevel.name, circuits: [...prevLevel.circuits, newCircuit]}))
    setCircuit(newCircuit)

    setNewCircuitId(-1);
    setShowModal(false)
  }

  return (
    <>
      <h1>F1 Clash Strategy</h1>
      <div>
        <Row className="level-circuit-row">
          <Col>
            <Dropdown variant="success" id="dropdown-basic-button">
              <Dropdown.Toggle id="dropdown-basic">
                {level.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {levels.map( (x, index) => (
                  <Dropdown.Item key={index} onClick={() => handleChangeLevel(x)}>
                    {x.name}
                  </Dropdown.Item>
                ))}
                </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown variant="success" id="dropdown-basic-button">
              <Dropdown.Toggle id="dropdown-basic">
                {level.circuits.length!==0 ? circuit.Name : "Circuits..."}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {level.circuits.map( (x, index) => (
                  <Row key={index} className="d-flex justify-content-between">
                    <Col lg={8}>
                      <Dropdown.Item key={index} onClick={() => setCircuit(x)} >
                        {x.Name}
                      </Dropdown.Item>
                    </Col >
                    <Col lg={3} className="ml-auto">
                      <CloseButton onClick={() => handleDeleteCircuit(x)} />
                    </Col>
                  </Row>
                ))}
                { level.circuits.length < CIRCUITS.length && <>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setShowModal(true)}>Add new circuit</Dropdown.Item>
                  </>}
                </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>{circuit 
            && <Image className="circuit-image" src={IMAGES_circuits[circuit.Name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_')]}/>
          }</Col>
          <Col>{circuit
           && <>
           <Image className="stat-image" src={IMAGES_icons[circuit.Driver_stat.replace(/\s+/g, '_').toLowerCase()]} /> &nbsp;
           {circuit.Driver_stat}
           </>}</Col>
          <Col>{circuit 
          && <>
            <Image className="stat-image" src={IMAGES_icons[circuit.Car_stat.replace(/\s+/g, '_').toLowerCase()]} /> &nbsp;
            {circuit.Car_stat}
          </>}</Col>
        </Row>
      
        { circuit && 
        <div className="main-table">
          <Row className="main-row-table">
            <Col className="main-tab-table" lg={6} xs={12}>
              <div className="setup-tab-title">
                <h2>Drivers</h2>
              </div>
              <Row>
                <Col lg={6}>
                  <DriverComponent title={"1st driver"} />
                </Col>
                <Col lg={6}>
                  <DriverComponent title={"2nd driver"} />
                </Col>
              </Row>
            </Col>
            <Col className="main-tab-table" lg={6} xs={12}>
              <div className="setup-tab-title">
                <h2>Components</h2>
              </div>
              <Row className="car-setup-row">
                <Col lg={4} xs={12} md={6}>
                  <CarComponent component="freni" title="Freni" circuit={circuit} />
                </Col>
                <Col lg={4} xs={12} md={6}>
                  <CarComponent component="cambio" title="Cambio" circuit={circuit} />
                </Col>
                <Col lg={4} xs={12} md={6}>
                  <CarComponent component="alettonePosteriore" title="Alettone Posteriore" circuit={circuit} />
                </Col>
                <Col lg={4} xs={12} md={6}>
                  <CarComponent component="alettoneAnteriore" title="Alettone Anteriore" circuit={circuit}/>
                </Col>
                <Col lg={4} xs={12} md={6}>
                  <CarComponent component="sospensioni" title="Sospensioni" circuit={circuit} />
                </Col>
                <Col lg={4} xs={12} md={6}>
                  <CarComponent component="motore" title="Motore" circuit={circuit} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="main-tab-table">
            
            </Col>
          </Row>
        </div>
        }

      </div>
      
      
      

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Circuit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select the new circuit for difficulty: {level.name}.
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              { newCircuitId===-1 ? "Select the circuit . . ." : CIRCUITS.find(x => x.id === newCircuitId).Name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              { CIRCUITS
                .filter( x => !level.circuits.some( y => x.id === y.id))
                .map( (x, index) => (
                <Dropdown.Item key={index} onClick={() => setNewCircuitId(x.id)}>
                  {x.Name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          { newCircuitId !== -1 &&
            <Button variant="primary" onClick={handleSaveModal}>
              Save Changes
            </Button>
          }
        </Modal.Footer>
      </Modal>
      
    </>
  )
}

function CarPartPage(props) {
  const { changeComponent, COMPONENTS } = props;
  
  const {part} = useParams()
  const navigate = useNavigate();

  const handleChange = (id, name) => {
    changeComponent(part, id, name)
    navigate(-1)
  }

  return (<>
    <h1>{part}</h1>
    <button onClick={() => navigate(-1)}>Back</button>
    <br/>
    {COMPONENTS
      .filter( x => {
        const [prefix, number] = x.id.split("_")
        return prefix === part && x.Level === "1" && number !== "0"
      } )
      .map( x => <Button onClick={() => handleChange(x.id, x.name)}>{x.id} {x.Name}</Button> )
    }
    
  </>)
}

export { Home, CarPartPage };