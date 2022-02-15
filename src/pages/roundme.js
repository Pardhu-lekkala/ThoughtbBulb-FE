import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Pannellum } from "pannellum-react";
import Swal from "sweetalert2";
import "./custom.css";
import { useEffect } from "react";

const RoundMe = (props) => {
  const history = useHistory();
  let videoUrl = localStorage.getItem("videoUrl");
  console.log(videoUrl, "this is video url");
  function goBack() {
    history.push("/Lobby");
    //https://conference-project-db.s3.amazonaws.com/Login_Transition_Video_1b22166559.mp4https://conference-project-db.s3.amazonaws.com/Login_Transition_Video_1b22166559.mp4
  }

  // function getValues(event) {
  //   console.log("called");
  //   let pan = document.getElementById("panellum");
  //   console.log(pan);
  //   var coords = pan.getPitch(event);
  //   console.log(coords);
  // }
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.hotSpotDebug = "true";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // const [yaw, setYaw] = React.useState(0);
  // const [pitch, setPitch] = React.useState(0);
  // console.log(pitch, yaw, "these are coordinates");
  // const panImage = React.useRef(null);

  function openDaiong() {
    Swal.fire({
      icon: "info",
      html: "Pannellum is built using WebGL and JavaScript</br>with a sprinkling of HTML5 and CSS3.Internally,</br>the standalone viewer parses URL parameters to</br> build a JSON-based configuration and then the</br> viewer using the JavaScript API.",
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  return (
    <>
      <div>
        {videoUrl.includes("embed") ? (
          <iframe
            width="100%"
            height="900px"
            //src="https://roundme.com/embed/sS5z1911RPgCNbOI28pj"
            src={videoUrl !== null || videoUrl !== "" ? videoUrl : null}
            zIndex="1"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
        ) : (
          <div>
            <Pannellum
              id="panellum"
              // ref={panImage}
              width="100%"
              height="100vh"
              image={videoUrl}
              hotSpotDebug={true}
              //handleClick={(evt, name) => getValues()}
              //image="https://conference-project-db.s3.amazonaws.com/Lobby_JPEG_587036c164.jpg"
              yaw={180}
              hfov={110}
              maxHfov={170}
              minHfov={30}
              autoLoad
              autoRotate={2}
              getViewer={true}
              //preview="https://upload.wikimedia.org/wikipedia/commons/1/14/Background_brick_wall.jpg"
              orientationOnByDefault={false}
              mouseEventToCoords={true}
              //autoRotateInactivityDelay={1}
              compass
              draggable
              keyboardZoom
              mouseZoom
              showControls
              showFullscreenCtrl
              showZoomCtrl
              // onMousedown={(evt) => {
              //   console.log("Mouse Down", evt.mouseEventToCoords);
              // }}
              // onMouseup={(event) => {
              //   setPitch(
              //     panImage.current.getViewer().mouseEventToCoords(event)[0]
              //   );
              //   setYaw(
              //     panImage.current.getViewer().mouseEventToCoords(event)[1]
              //   );
              // }}
            ></Pannellum>
          </div>
        )}

        <button
          onClick={() => {
            goBack();
          }}
          style={{
            zIndex: 999,
            position: "fixed",
            top: 30,
            left: 30,
            width: 60,
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon />
        </button>
      </div>
    </>
  );
};

export default RoundMe;
