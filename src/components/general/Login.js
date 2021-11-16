import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import useStyles from "./useStylesLogin";

import ReactPlayer from "react-player";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { startSetProject } from "../../redux/actions/project";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} style={{
      position: "absolute",
      left: "45%",
      top: "35%",
      zIndex: 1000,
      height: "150px",
      width: "250px",
    }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress style={{height:"10px"}} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 90 ? 99 : prevProgress + 5
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}


function Login({ history, match, project, startSetProject }) {
  const classes = useStyles();

  const [videoNo, setVideoNo] = React.useState(0);
  const [LoginSignupLoopMP4, setLoginSignupLoop] = React.useState(null);
  const [LoginSignupTransitionMP4, setLoginSignupTransition] =
    React.useState(null);

    function validation(){
      let email= document.getElementById('email').value;
      let form= document.getElementById('form');
      let text= document.getElementById('text');
      let pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      console.log(email);
         
      if(email.match(pattern)){
        form.classList.add("valid");
        form.classList.remove("invalid");
        // text.innerHTML="Your Email is valid";
        // text.style.color="green";
        setVideoNo(1);
      }
      else{
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML="please enter a valid email";
        text.style.color="red";
      }
    }

  React.useEffect(() => {
    (async () => {
      await startSetProject(match.params.accesscode);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (project?.backgroundVideo?.url) {
      axios
        .get(
          //`https://platoodemo.s3.ap-south-1.amazonaws.com/assets/LoginSignupLoop.mp4`,
          `${project.backgroundVideo.url}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token",
            },
            responseType: "blob",
          }
        )
        .then(async (response) => {
          const URL = window.URL || window.webkitURL;
          const url = URL.createObjectURL(
            new Blob([response.data], { type: "video/mp4" })
          );

          setLoginSignupLoop(url);
        });

      axios
        .get(
          //`https://platoodemo.s3.ap-south-1.amazonaws.com/assets/LoginSignupTransition.mp4`,
          `${project.transVideo.url}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token",
            },
            responseType: "blob",
          }
        )
        .then((response) => {
          const URL = window.URL || window.webkitURL;
          const url = URL.createObjectURL(
            new Blob([response.data], { type: "video/mp4" })
          );
          setLoginSignupTransition(url);
        });
    }
  }, [project]);

  return (
    <>
      {LoginSignupLoopMP4 === null || LoginSignupTransitionMP4 === null ? (
       <LinearWithValueLabel />
      ) : (
        <>
          <video autoPlay muted loop className={classes.LoginSignupLoop}>
            <source src={LoginSignupLoopMP4} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <header className={classes.viewportHeader}>
          <form class="form" action="#" id="form">
            <Grid container spacing={4} style={{ margin: "170px 70px" }}>
              <Grid item xs={12}>
                <TextField
                   id="email"
                   name="email"
                   label="Email"
                   type="Email"
                   required
                   variant="outlined"
                   style={{ color: "black", backgroundColor: "white" }}
                   onClick={
                     ()=>{
                       let text= document.getElementById('text');
                       text.innerHTML="";
                     }
                   }
                   
                />
              </Grid>
              <span id="text" style={{fontWeight:"bolder", backgroundColor:"white", marginLeft:"20px"}}>
                </span>
              <Grid item xs={12}>
                <Button className="loginbtn"
                  variant="contained"
                  style={{
                    color: project.secondaryColor,
                    backgroundColor: project.primaryColor,
                    borderRadius:"15px"
                  }}
                  onClick={() => validation()}
                >
                  Login
                  <CircularProgress
                    style={{
                      display: videoNo === 1 ? "block" : "none",
                      width: "16px",
                      height: "16px",
                      marginLeft: "20px",
                      color: project.secondaryColor,
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
            </form>
          </header>

          {videoNo === 1 && (
            <>
            <ReactPlayer
              url={LoginSignupTransitionMP4}
              autoPlay={true}
              playing={true}
              //muted={true}
              controls={false}
              width="100%"
              height="auto"
              className={classes.LoginSignupLoop}
              onEnded={() => {
                history.push("/Lobby");
              }}
              style={{ zIndex: videoNo === 1 ? 100 : "" }}
            />
            <Button
                id="skipbtn"
                style={{
                  color: `${project.secondaryColor}`,
                  backgroundColor: `${project.primaryColor}`,
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  zIndex: "200",
                  borderRadius:"15px"
                }}
                onClick={
                  (() => setVideoNo(0),
                  () => {
                    history.push("/Lobby");
                  })
                }
              >
                skip
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({ project: state.project });

const mapDispatchToProps = { startSetProject };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
