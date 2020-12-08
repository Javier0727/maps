import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Fade,
  Form,
  Jumbotron,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import "./styles.style.css";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [clientName, setClientName] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  const redirectToTravel = () => {
    history.push("/travel");
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setClientName(value);
  };

  const initTravel = () => {
    if (clientName !== "") {
      dispatch(Actions.setNameClient({ clientName }));
      redirectToTravel();
    } else {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setAlertShow(!alertShow);
  };

  return (
    <Fade appear={true} in={true} timeout={1000}>
      <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center position-relative">
        <Jumbotron className="shadow-sm">
          <Container>
            <h1>Bienvenido</h1>
            <p>Antes de empezar ingresa tu nombre.</p>
            <Form onSubmit={initTravel}>
              <Form.Group>
                <Form.Control
                  name="clientName"
                  onChange={handleChange}
                  type="text"
                  placeholder="Nombre"
                />
              </Form.Group>
              <Button className="w-100" variant="primary" onClick={initTravel}>
                Empezar
              </Button>
            </Form>
          </Container>
        </Jumbotron>
        <div className="position-absolute w-50 alertPosition">
          <Alert
            variant="danger"
            show={alertShow}
            onClose={toggleModal}
            dismissible
          >
            <p>Falta ingresar tu nombre para poder comenzar.</p>
          </Alert>
        </div>
      </div>
    </Fade>
  );
};

export default Home;
