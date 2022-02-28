import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Pannellum } from "pannellum-react";
import Swal from "sweetalert2";
import "./custom.css";
import { useEffect } from "react";
import { Tooltip } from "@material-ui/core";

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

  const [yaw, setYaw] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  console.log(pitch, yaw, "these are coordinates");
  const panImage = React.useRef(null);
  const [image, setImage] = React.useState(
    "https://thumbs.dreamstime.com/z/minsk-belarus-december-full-degree-panorama-equirectangular-spherical-projection-shop-stylish-shoes-vr-content-138851430.jpg"
    //"https://thumbs.dreamstime.com/b/brand-new-interior-cloth-store-luxury-fashionable-47260857.jpg"
    //"https://thumbs.dreamstime.com/z/moscow-russia-november-shop-goods-extreme-sports-d-spherical-panorama-viewing-angle-moscow-russia-december-shop-sporting-goods-107433981.jpg"
  );
  const [imageChange, setImageChange] = React.useState(false);

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
              width="100%"
              ref={panImage}
              height="100vh"
              //image={videoUrl}
              image={image}
              hotSpotDebug={true}
              yaw={180}
              hfov={110}
              maxHfov={170}
              minHfov={30}
              autoLoad
              autoRotate={2}
              getViewer={true}
              orientationOnByDefault={false}
              mouseEventToCoords={true}
              compass
              draggable
              keyboardZoom
              mouseZoom
              showControls
              showFullscreenCtrl
              showZoomCtrl
              onMouseup={(event) => {
                setPitch(
                  panImage.current.getViewer().mouseEventToCoords(event)[0]
                );
                setYaw(
                  panImage.current.getViewer().mouseEventToCoords(event)[1]
                );
              }}
            >
              <Pannellum.Hotspot
                type="info"
                text="Clothing"
                pitch={0.7443754612679627}
                yaw={165.0303762778178}
                name="hs1"
                //URL="www.cumulations.com"
              />
              <Pannellum.Hotspot
                type="info"
                text="Footware"
                pitch={9.194244140086639}
                yaw={177.26987709068416}
                name="hs1"
                //URL="www.cumulations.com"
              />

              <Pannellum.Hotspot
                type="custom"
                text="pardhu"
                pitch={9.755711165305666}
                yaw={-156.5383286097341}
                handleClick={(evt, name) => {
                  //setImage("https://pannellum.org/images/alma.jpg");
                  setImage(
                    "https://thumbs.dreamstime.com/b/brand-new-interior-cloth-store-luxury-fashionable-47260857.jpg"
                  );
                }}
                name="hs1"
              />
            </Pannellum>
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
