import React from "react";
import { Fade } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const redirectToTravel = () => {
    history.push("/travel");
  };

  return (
    <Fade appear={true} in={true} timeout={1000}>
      <div>
        <div>Home</div>
        <br />
        <div style={{ cursor: "pointer" }} onClick={redirectToTravel}>
          Go to travel
        </div>
      </div>
    </Fade>
  );
};

export default Home;
