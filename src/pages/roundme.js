import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Pannellum } from "pannellum-react";

const RoundMe = (props) => {
  const history = useHistory();
  let videoUrl = localStorage.getItem("videoUrl");
  console.log(videoUrl, "this is video url");
  function goBack() {
    history.push("/Lobby");
    //https://conference-project-db.s3.amazonaws.com/Login_Transition_Video_1b22166559.mp4https://conference-project-db.s3.amazonaws.com/Login_Transition_Video_1b22166559.mp4
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
          <Pannellum
            width="100%"
            height="100vh"
            image={videoUrl}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            autoRotate={10}
            showZoomCtrl={false}
            //showControls={true}
            onLoad={() => {
              console.log("image loaded");
            }}
          />
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
