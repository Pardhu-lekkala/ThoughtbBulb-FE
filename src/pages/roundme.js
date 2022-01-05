import React from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
        {/* <button
          style={{
            backgroundColor: "lightgreen",
            height: "30px",
            width: "80px",
            fontFamily: "roboto",
            fontSize: "16px",
            color: "black",
            borderWidth: "0px",
            borderRadius: "5px",
          }}
          onClick={goBack}
        >
          Back
        </button> */}
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
