import { Container, Row, Col, Button, Dropdown, Modal, Form, CloseButton, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import IMAGES_components from '../images/images.jsx';
import '../App.css';


function CarComponent(props) {
  const { component, title, circuit } = props;

  const navigate = useNavigate()

  const existsImage = (component) => {
    const condition = circuit && circuit.components 
    switch(component) {
      case "freni":
        return condition && circuit.components.freni.id && IMAGES_components[circuit.components.freni.id]
      case "cambio":
        return condition  && circuit.components.cambio.id && IMAGES_components[circuit.components.cambio.id]
      case "alettonePosteriore":
        return condition && circuit.components.alettonePosteriore.id && IMAGES_components[circuit.components.alettonePosteriore.id]
      case "alettoneAnteriore":
        return condition && circuit.components.alettoneAnteriore.id && IMAGES_components[circuit.components.alettoneAnteriore.id]
      case "sospensioni":
        return condition && circuit.components.sospensioni.id && IMAGES_components[circuit.components.sospensioni.id]
      case "motore":
        return condition && circuit.components.motore.id && IMAGES_components[circuit.components.motore.id]
      default:
        return false
       
    } 
  }

  return (
    <>
      <div>{title}</div>
      <div className="component-tab" onClick={() => navigate(`/f1-clash/car-setup/${component}`)}>
        {existsImage(component)
        ? (<>
          <Row>
            <Col>
              {existsImage(component) ? 
                (<Image src={IMAGES_components[circuit.components[component].id]} className="component-image" fluid />) : 
                (<div className="rounded"/>)
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <span>{circuit.components[component].name}</span>
            </Col>
          </Row>
        </>)
        : (<>
          <div>
            <p>Add component...</p>
          </div>
        </>)
        }
      </div>
    </>
  )
}


export {CarComponent};