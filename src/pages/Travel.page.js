import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import { useHistory } from "react-router-dom";
import Route from "../components/route";

const Travel = (props) => {
  const [state, setState] = useState({
    origin: "",
    destination: "",
  });
  const mapsRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [googleMapState, setGoogleMapState] = useState();
  const {
    clientName,
    provideRouteAlternatives,
    travelMode,
    routes,
  } = props.data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const createGoogleMap = () => {
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
    var mexico = new window.google.maps.LatLng(
      19.382259692315973,
      -99.11066526656647
    );
    var mapOptions = {
      zoom: 7,
      center: mexico,
    };
    const googleMap = new window.google.maps.Map(mapsRef.current, mapOptions);
    directionsRendererInstance.setMap(googleMap);
    setGoogleMapState(googleMap);
  };

  const calcRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const { origin, destination } = state;
    var request = {
      origin,
      destination,
      travelMode,
      provideRouteAlternatives,
    };

    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        dispatch(Actions.setRoutesData(result));
        for (var i = 0, len = result.routes.length; i < len; i++) {
          new window.google.maps.DirectionsRenderer({
            map: googleMapState,
            directions: result,
            routeIndex: i,
            polylineOptions: {
              strokeColor: i === 0 ? "#669df6" : "#bbbdbf",
              strokeOpacity: i === 0 ? 1 : 0.7,
              strokeWeight: 4,
            },
          });
        }
      }
    });
  };

  useEffect(() => {
    if (clientName !== "") {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places`;
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        createGoogleMap();
      });
    } else {
      history.push("/");
    }
  }, []);

  return (
    <Fade appear={true} in={true} timeout={1000}>
      <Container
        fluid
        className="vh-100 d-flex flex-column justify-content-center"
      >
        <Row className="overflow-auto">
          <Col
            xs={12}
            md={4}
            className="overflow-auto"
            style={{ height: "90vh" }}
          >
            <h3 className="p-3 text-center">
              ¿Esta vez a donde iremos{" "}
              <span className="text-primary">{clientName}</span>?
            </h3>
            <Form onSubmit={calcRoute} style={{ marginBottom: "1.5rem" }}>
              <Form.Group>
                <Form.Label>
                  <span className="text-primary">¿De dónde</span> sales?
                </Form.Label>
                <Form.Control
                  name="origin"
                  onChange={handleChange}
                  type="text"
                  placeholder="Origen"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <span className="text-primary">¿A dónde</span> te diriges?
                </Form.Label>
                <Form.Control
                  name="destination"
                  onChange={handleChange}
                  type="text"
                  placeholder="Destino"
                />
              </Form.Group>
              <Button className="w-100" variant="primary" onClick={calcRoute}>
                Buscar ruta
              </Button>
            </Form>
            {routes.length > 0 &&
              routes.map((route) => (
                <Route
                  key={`${route.legs[0].distance.text}-Route`}
                  data={route.legs[0]}
                ></Route>
              ))}
          </Col>
          <Col xs={12} md={8}>
            <div className="w-100 mapsH" ref={mapsRef}></div>
          </Col>
        </Row>
      </Container>
    </Fade>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, null)(Travel);
