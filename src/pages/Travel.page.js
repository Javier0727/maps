import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import { useHistory } from "react-router-dom";
import Route from "../components/route";
import { orderBySelect } from "../constants";

const Travel = (props) => {
  const [state, setState] = useState({
    origin: "",
    destination: "",
  });
  const mapsRef = useRef(null);
  const mapsAutocompleteFrom = useRef(null);
  const mapsAutocompleteTo = useRef(null);
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
    const { origin, destination } = e;
    setState({ ...state, origin, destination });
  };

  const createGoogleMap = () => {
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
    var mexico = { lat: 23.6, lng: -102.5 };
    var mapOptions = {
      zoom: 5,
      center: mexico,
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
    };
    const googleMap = new window.google.maps.Map(mapsRef.current, mapOptions);
    directionsRendererInstance.setMap(googleMap);
    new window.google.maps.places.Autocomplete(mapsAutocompleteFrom.current);
    new window.google.maps.places.Autocomplete(mapsAutocompleteTo.current);
    setGoogleMapState(googleMap);
  };

  const calcRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    let origin = mapsAutocompleteFrom.current.value;
    let destination = mapsAutocompleteTo.current.value;
    handleChange({ origin, destination });
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

  const handleChangeOrder = (e) => {
    const { value } = e.target;
    dispatch(Actions.orderRoutes({ orderBy: value, routes }));
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
                  ref={mapsAutocompleteFrom}
                  value={state.origin}
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
                  ref={mapsAutocompleteTo}
                  value={state.destination}
                />
              </Form.Group>
              <Button className="w-100" variant="primary" onClick={calcRoute}>
                Buscar ruta
              </Button>
            </Form>
            {routes.length > 0 && (
              <Form.Group className="d-flex justify-content-end align-items-center">
                <Form.Label className="mb-0 mr-2 text9">Ordenar por</Form.Label>
                <Form.Control
                  className="w-25"
                  size="sm"
                  as="select"
                  onChange={handleChangeOrder}
                >
                  {orderBySelect.map((order) => (
                    <option key={`${order.value}-select`} value={order.value}>
                      {order.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
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
