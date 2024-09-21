import { CIRCUITS, COMPONENTS } from '../mocks/mocks.js'
import { React, useState } from 'react';
import { Container, Row, Col, Button, Dropdown, Modal, Form, CloseButton, Image } from 'react-bootstrap';
import { CarComponent } from './HomeComponents.jsx';
import { useNavigate, useParams } from 'react-router-dom';

import IMAGES_components from '../images/images.jsx';
import '../App.css';

function Home(props) {
  const { levels, setLevels, level, setLevel, circuit, setCircuit } = props;

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
      <Container fluid>
        <Row>
          <Col>
            <Dropdown variant="successi" id="dropdown-basic-button">
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
                {level.circuits.length!==0 ? circuit.name : "Circuits..."}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {level.circuits.map( (x, index) => (
                  <Row key={index} className="d-flex justify-content-between">
                    <Col xs={8}>
                      <Dropdown.Item key={index} onClick={() => setCircuit(x)} >
                        {x.name}
                      </Dropdown.Item>
                    </Col >
                    <Col xs={3} className="ml-auto">
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
          <Col>{circuit && circuit.stats.driver}</Col>
          <Col>{circuit && circuit.stats.car}</Col>
        </Row>
      
        { circuit && <>
        <Row>
          <Col className="main-tab left-tab">
            <h2>Drivers</h2>
            <Row>
              <Col xs={6}></Col>
              <Col xs={6}></Col>
            </Row>
          </Col>
          <Col className="main-tab right-tab">
            <h2>Components</h2>
            <Row className="car-setup-tab">
              <Col xs={4}>
                <CarComponent component="freni" title="Freni" circuit={circuit} />
              </Col>
              <Col xs={4}>
                <CarComponent component="cambio" title="Cambio" circuit={circuit} />
              </Col>
              <Col xs={4}>
                <CarComponent component="alettonePosteriore" title="Alettone Posteriore" circuit={circuit} />
              </Col>
            </Row>
            <Row className="car-setup-tab">
              <Col xs={4}>
                <CarComponent component="alettoneAnteriore" title="Alettone Anteriore" circuit={circuit}/>
              </Col>
              <Col xs={4}>
                <CarComponent component="sospensioni" title="Cambio" circuit={circuit} />
              </Col>
              <Col xs={4}>
                <CarComponent component="motore" title="Motore" circuit={circuit} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="main-tab">
          
          </Col>
        </Row>
        </>}

      </Container>
      
      
      

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Circuit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select the new circuit for difficulty: {level.name}.
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              { newCircuitId===-1 ? "Select the circuit . . ." : CIRCUITS.find(x => x.id === newCircuitId).name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              { CIRCUITS
                .filter( x => !level.circuits.some( y => x.id === y.id))
                .map( (x, index) => (
                <Dropdown.Item key={index} onClick={() => setNewCircuitId(x.id)}>
                  {x.name}
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
  const { changeComponent } = props;
  
  const {part} = useParams()
  const navigate = useNavigate();

  const handleChange = (id, name) => {
    changeComponent(part, id, name)
    navigate(-1)
  }

  return (<>
    <button onClick={() => navigate(-1)}>Back {part}</button>
    <br/>
    {COMPONENTS[part]
      .map( x => <Button onClick={() => handleChange(x.id, x.name)}>{x.id} {x.name}</Button> )
    }
    
  </>)
}

export { Home, CarPartPage };