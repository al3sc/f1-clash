import { Container, Row, Col, Button, Dropdown, Modal, Form, CloseButton, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { IMAGES_components, IMAGES_icons } from '../images/images.jsx';
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
    <div className="car-setup-tab" >
      <span className="single-row-text">{title}</span>
      <div className="component-tab" onClick={() => navigate(`/f1-clash/car-setup/${component}`)}>
        {/*<div>
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
                <span className="single-row-text">{circuit.components[component].Name}</span>
              </Col>
            </Row>
          </>)
          : (<>
            <div>
              <Image src={IMAGES_components[`${component}_0`]} className="component-image" fluid />
            </div>
          </>)
          }
        </div>*/}
        
        {existsImage(component)
          ? (<><div>
          <Row>
            <Col lg={8} xs={12}>
            {existsImage(component) ? 
                  (<Image src={IMAGES_components[circuit.components[component].id]} className="component-image" fluid />) : 
                  (<div className="rounded"/>)
            }
            </Col>
            <Col lg={4} xs={12}>
              <Row>
                <Col lg={12} xs={2} className="single-row-text small-text">
                  <Image className="stat-image" src={IMAGES_icons["speed"]}/> { circuit.components[component].Speed || 1 }
                </Col>
                <Col lg={12} xs={2} className="single-row-text small-text">
                  <Image className="stat-image" src={IMAGES_icons["cornering"]}/> { circuit.components[component].Cornering || 1}
                </Col>
                <Col lg={12} xs={2} className="single-row-text small-text">
                  <Image className="stat-image" src={IMAGES_icons["power_unit"]}/> { circuit.components[component].Power_Unit || 1 }
                </Col>
                <Col lg={12} xs={2} className="single-row-text small-text">
                  <Image className="stat-image" src={IMAGES_icons["qualifying"]}/> { circuit.components[component].Qualifying || 1 }
                </Col>
                <Col lg={12} xs={4} className="single-row-text small-text">
                  <Image className="stat-image" src={IMAGES_icons["pit_time"]}/> { circuit.components[component].Pit_Time || 1}
                </Col>
              </Row>
              
            </Col>
          </Row>
        </div>
        </>)
        : (<>
          <div>
            <Image src={IMAGES_components[`${component}_0`]} className="component-image" fluid />
          </div>
        </>)
        }
        
        {/*
        { circuit.components &&
          <div>
            <Row className="no-gutters">
              <Col className="component-stat-info">
                Speed: { circuit.components[component].Speed || 1 }
              </Col>
              <Col className="component-stat-info">
                Cornering: { circuit.components[component].Cornering || 1}
              </Col>
            </Row>
            <Row>
              <Col className="component-stat-info">
                Power Unit: { circuit.components[component].Power_Unit || 1 }
              </Col>
              <Col className="component-stat-info">
                Qualifyng: { circuit.components[component].Qualifying || 1 }
              </Col>
            </Row>
            <Row>
              <Col className="component-stat-info">
                Pit Time: { circuit.components[component].Pit_Time || 1}
              </Col>
            </Row>
          </div>
        }
          */}
      </div>
    </div>
  )
}

function DriverComponent(props) {
  const { title } = props;
  
  return (
    <div>
      <div>{title}</div>
      <div className="driver-tab" onClick={() => navigate(`/f1-clash/driver-setup/${driver}`)}>
        
      </div>
    </div>
  )
}


export {CarComponent, DriverComponent};