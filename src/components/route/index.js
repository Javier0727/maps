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
    <Jumbotron fluid className="shadow-sm py-3 rounded itemH mb-3">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col
            xs={{ span: 7, offset: 1 }}
            className="d-flex flex-column justify-content-between"
          >
            <div>
              <div className="text9 text-truncate">{start_address}</div>
              <div className="text-secondary text7">
                @{start_location.lat()} {start_location.lng()}
              </div>
            </div>

            <div>
              <div className="text9 text-truncate">{end_address}</div>
              <div className="text-secondary text7">
                @{end_location.lat()} {end_location.lng()}
              </div>
            </div>
          </Col>
          <Col xs={3} className="d-flex flex-column justify-content-between">
            <div className="text-right">
              <div className="text8">{duration.text}</div>
              <div className="text-secondary text7">de viaje</div>
            </div>

            <div className="text-right">
              <div className="text8">{distance.text}</div>
              <div className="text-secondary text7">de viaje</div>
            </div>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Route;
