import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { Form, Button } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";

const Travel = () => {
  const [state, setState] = useState({
    origin: "",
    destination: "",
  });
  const mapsRef = useRef(null);
  const dispatch = useDispatch();
  const [googleMapState, setGoogleMapState] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const dispatchSetData = () => {
    dispatch(Actions.setData({ ...state }));
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
      travelMode: "DRIVING",
      provideRouteAlternatives: true,
    };

    directionsService.route(request, function (result, status) {
      if (status === "OK") {
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
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      createGoogleMap();
    });
  }, []);

  return (
    <Fade appear={true} in={true} timeout={1000}>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Punto de partida</Form.Label>
            <Form.Control name="origin" onChange={handleChange} type="text" />
            <Form.Text className="text-muted">
              Será el punto de partida
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Punto de destino</Form.Label>
            <Form.Control
              name="destination"
              onChange={handleChange}
              type="text"
            />
            <Form.Text className="text-muted">
              Será el punto de llegada
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={calcRoute}>
            Cotizar
          </Button>
        </Form>
        <div style={{ width: "100%", height: "40rem" }} ref={mapsRef}></div>
      </div>
    </Fade>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, null)(Travel);
