import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import "./route.style.css";

const Route = ({ data }) => {
  const {
    distance,
    duration,
    end_address,
    end_location,
    start_address,
    start_location,
  } = data;
  return (
    <Jumbotron fluid className="shadow-sm py-3 rounded itemH">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col xs={2}></Col>
          <Col xs={6} className="d-flex flex-column justify-content-between">
            <div>
              <div style={{ fontSize: ".9rem" }}>{start_address}</div>
              <div style={{ fontSize: ".7rem" }} className="text-secondary">
                @{start_location.lat()} {start_location.lng()}
              </div>
            </div>

            <div>
              <div style={{ fontSize: ".9rem" }}>{end_address}</div>
              <div style={{ fontSize: ".7rem" }} className="text-secondary">
                @{end_location.lat()} {end_location.lng()}
              </div>
            </div>
          </Col>
          <Col xs={4} className="d-flex flex-column justify-content-between">
            <div>
              <div style={{ fontSize: ".8rem" }}>{duration.text}</div>
              <div style={{ fontSize: ".7rem" }} className="text-secondary">
                de viaje
              </div>
            </div>

            <div>
              <div style={{ fontSize: ".8rem" }}>{distance.text}</div>
              <div style={{ fontSize: ".7rem" }} className="text-secondary">
                de viaje
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Route;
