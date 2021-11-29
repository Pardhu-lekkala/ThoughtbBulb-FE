import React from "react";
import { connect } from "react-redux";
import useStyles from "./useStylesLobby";
import "../../styles/componentStyles/lobby.css";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { BsChevronCompactDown } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import useWindowDimensions from "./useWindowDimensions";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Backdrop from "@material-ui/core/Backdrop";
import { ColorizeOutlined } from "@material-ui/icons";

// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

/* function updatePointer(windowWidth, windowHeight, image, target) {
  // Get largest dimension increase
  var xScale = windowWidth / image.width;
  var yScale = windowHeight / image.height;
  var scale;
  var yOffset = 0;
  var xOffset = 0;

  if (xScale > yScale) {
    // The image fits perfectly in x axis, stretched in y
    scale = xScale;
    yOffset = (windowHeight - image.height * scale) / 2;
  } else {
    // The image fits perfectly in y axis, stretched in x
    scale = yScale;
    xOffset = (windowWidth - image.width * scale) / 2;
  }

  //pointer.css("top", target.y * scale + yOffset);
  //pointer.css("left", target.x * scale + xOffset);
  return {
    top: `${target.y * scale + yOffset}px`,
    left: `${target.x * scale + xOffset}px`,
  };
} */
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function updatePointer2(makrw, makrh, imagew, imageh) {
  let width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  let height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  // console.clear();
  //console.log(width, height);

  const neww = (makrw / imagew) * width;
  const newh = (makrh / imageh) * height;
  let obj = { X: neww, Y: newh };

  //console.log({ X: (obj.X ^ 0) - 10, Y: (obj.Y ^ 0) - 10 });

  //<div class="marker1" style="position: absolute; top: 86px; left: 673px; width: 10px; height: 10px; background: rgb(255, 0, 0);"></div>
  const radiusw = (22 / imagew) * width;
  const radiush = (22 / imageh) * height;
  return {
    top: `${(obj.Y ^ 0) - radiush}px`,
    left: `${(obj.X ^ 0) - radiusw}px`,
  };
}
// function color(id){
//   console.log("jhbjvjvjvjjvvj",id);
// }
function Lobby({ history, project }) {
  const page = project.pages.find((e) => e.id === project.homepage);
  const classes = useStyles();
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);
  const [LabelIsOpen, setLabelIsOpen] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setLabelIsOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setLabelIsOpen(true);
  };

  const [videoNo, setVideoNo] = React.useState({
    no: 0,
    src: null,
    pageId: null,
  });

  const { height, width } = useWindowDimensions();

  // This ref is connected to the BG
  const BGRef = React.useRef();

  // The size of the BG // It will be updated later
  const [BGwidth, setBGWidth] = React.useState();
  const [BGheight, setBGHeight] = React.useState();
  const [url, setUrl] = React.useState("");
  const [isHover, setIsHover] = React.useState(false);

  // This function calculates width and height of the BG
  const getBGSize = () => {
    const newWidth = BGRef.current.clientWidth;
    setBGWidth(newWidth);

    const newHeight = BGRef.current.clientHeight;
    setBGHeight(newHeight);
  };

  // Get 'width' and 'height' after the initial render and every time the window height/width changes
  React.useEffect(() => {
    getBGSize();
  }, [height, width]);

  let setShowIcon = false;

  function tooltip() {
    setTimeout(function () {
      setTooltipIsOpen(false);
    }, 5000);
  }
  tooltip();

  const NewTooltip = withStyles({
    tooltip: {
      color: project.primaryColor,
      backgroundColor: project.secondaryColor,
    },
    arrow: {
      color: project.secondaryColor,
    },
  })(Tooltip);
  let loginCredentials = localStorage.getItem("email");

  return (
    <>
      <video
        poster={page?.backgroundImage?.url}
        className={classes.lobbyBG}
        autoPlay
        muted
        loop
        ref={BGRef}
      >
        <source src={localStorage.getItem("lobby")} type="video/mp4" />
        {/* <source src={page?.backgroundVideo?.url} type="video/mp4" /> */}
        Your browser does not support HTML5 video.
      </video>

      <header className={classes.viewportHeader}>
        <>
          {page.markers.map((item, index) => {
            if (item.VisibileLabel) {
              return (
                <>
                  <Tooltip
                    key={index}
                    title={
                      <b style={{ fontSize: "0.8vw" }}>{item.markerLabel}</b>
                    }
                    placement="top"
                    arrow
                    open={LabelIsOpen}
                  >
                    <NewTooltip
                      key={index}
                      title={
                        <b style={{ fontSize: "0.8vw" }}>{item.markerLabel}</b>
                      }
                      placement="top"
                      arrow
                    >
                      <span
                        className={classes.pulseAnimation}
                        id={index}
                        // onMouseEnter={() => {
                        // setIsHover(true);
                        // color({index});
                        // color(this.id)
                        // this.style.background="yellow";
                        // }}
                        // onMouseLeave={() => {
                        // setIsHover(false);
                        // Colorout(this.index)
                        // this.style.background="red"
                        // }}
                        style={{
                          backgroundColor: isHover
                            ? project.primaryColor
                            : project.markerColor,
                          position: "relative",

                          top: updatePointer2(
                            +item?.markerPosition?.split(",")[0],
                            +item?.markerPosition?.split(",")[1],
                            page?.backgroundImage?.width,
                            page?.backgroundImage?.height
                          ).top,

                          left: updatePointer2(
                            +item?.markerPosition?.split(",")[0],
                            +item?.markerPosition?.split(",")[1],
                            //320,574, //funzone
                            // 652, 530, //beach
                            //946, 614, //helpdesk
                            page?.backgroundImage?.width,
                            page?.backgroundImage?.height
                          ).left,
                        }}
                        onClick={() => {
                          if (item.destinationType == "PDF") {
                            setUrl(item.destinationLink);
                            handleClickOpen();
                          } else if (item.destinationType == "Link") {
                            window.open(item.destinationLink);
                          } else {
                            let scrollDown =
                              document.getElementById("profile-menu");
                            scrollDown.style.display = "none";
                            setLabelIsOpen(false);
                            setTooltipIsOpen(false);
                            item.TransVideo
                              ? setVideoNo({
                                  no: 1,
                                  src: item.TransVideo.url,
                                  pageId: item.destinationPage,
                                })
                              : console.log("No Transition Video");
                          }
                        }}
                      ></span>
                    </NewTooltip>
                  </Tooltip>
                  <video
                    src={item.TransVideo ? item.TransVideo.url : ""}
                    preload="auto"
                    style={{ display: "none" }}
                  />
                </>
              );
            } else {
              return (
                <>
                  <Tooltip
                    key={index}
                    title={
                      <b style={{ fontSize: "0.8vw" }}>{item.markerLabel}</b>
                    }
                    placement="top"
                    arrow
                    leaveDelay={300}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 400 }}
                    open={tooltipIsOpen}
                  >
                    <NewTooltip
                      key={index}
                      title={
                        <b style={{ fontSize: "0.8vw" }}>{item.markerLabel}</b>
                      }
                      placement="top"
                      arrow
                      leaveDelay={300}
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 400 }}
                    >
                      <span
                        id={index}
                        className={classes.pulseAnimation}
                        // onMouseEnter={() => {
                        //   setIsHover(true);
                        // }}
                        // onMouseLeave={() => {

                        //   setIsHover(false);
                        // }}
                        style={{
                          backgroundColor: isHover
                            ? project.primaryColor
                            : project.markerColor,
                          position: "relative",

                          top: updatePointer2(
                            +item?.markerPosition?.split(",")[0],
                            +item?.markerPosition?.split(",")[1],
                            page?.backgroundImage?.width,
                            page?.backgroundImage?.height
                          ).top,

                          left: updatePointer2(
                            +item?.markerPosition?.split(",")[0],
                            +item?.markerPosition?.split(",")[1],
                            //320,574, //funzone
                            // 652, 530, //beach
                            //946, 614, //helpdesk
                            page?.backgroundImage?.width,
                            page?.backgroundImage?.height
                          ).left,
                        }}
                        onClick={() => {
                          let scrollDown =
                            document.getElementById("profile-menu");
                          scrollDown.style.display = "none";
                          if (item.destinationType == "PDF") {
                            document.getElementById(
                              "modalContent"
                            ).style.display = "block";
                          } else if (item.destinationType == "link") {
                            window.open(item.destinationLink);
                          } else {
                            setLabelIsOpen(false);
                            setTooltipIsOpen(false);
                            item.TransVideo
                              ? setVideoNo({
                                  no: 1,
                                  src: item.TransVideo.url,
                                  pageId: item.destinationPage,
                                })
                              : console.log("No Transition Video");
                          }
                        }}
                      ></span>
                    </NewTooltip>
                  </Tooltip>
                  <video
                    src={item.TransVideo ? item.TransVideo.url : ""}
                    preload="auto"
                    style={{ display: "none" }}
                  />
                </>
              );
            }
          })}
          <div>
            {/* <Backdrop open={open} onClose={handleClose}>
              <embed
                src={url}
                type="application/pdf"
                height={800}
                width={500}
              />
            </Backdrop> */}
            <Dialog
              open={open}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
              style={{ width: "90vw", height: "90vh" }}
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              ></DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <iframe
                    src={url}
                    style={{ width: "40vw", height: "60vh" }}
                    //style={{ width: "90vw", height: "90vh" }}
                    //style={{ width: "90%", height: "90%" }}
                    frameborder="0"
                  ></iframe>
                  {/* <embed
                    src={url}
                    type="application/pdf"
                    height={800}
                    width={500}
                  /> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div
            id="profile-menu"
            class="profile-menu"
            style={{ background: "#ffffff", right: "60px" }}
          >
            <div class="profile-menu-header">
              <Tooltip
                title={<b style={{ fontSize: "0.8vw" }}>{loginCredentials}</b>}
                placement="left"
              >
                <a
                  id="profile-menu-user"
                  class="profile-menu-user"
                  href="javascript:void(0);"
                >
                  <HiOutlineUser
                    class="resizeicon"
                    size="70%"
                    color="black"
                    style={{ paddingTop: "1vh" }}
                  />
                </a>
              </Tooltip>
              <div id="collapsible1" style={{ display: "none" }}>
                <div
                  class="spacer"
                  style={{ backgroundColor: "#5b5b5b" }}
                ></div>
                {project.pages.map((item) => (
                  <div class="collapsible-container">
                    <div
                      class="content"
                      style={{
                        background: "rgb(255, 255, 255)",
                        maxHeight: "547px",
                      }}
                    >
                      <div class="icon-links">
                        <div style={{ backgroundColor: "#5b5b5b" }}></div>
                        <div>
                          <a
                            id="link"
                            onClick={() => {
                              if (item.id == project.homepage) {
                                alert("already in lobby");
                              } else {
                                history.push(`/page/${item.id}`);
                                window.location.reload();
                              }
                            }}
                          >
                            <img
                              class="img-100"
                              src={item.pageIcon.url}
                              alt={item.pageName}
                            />
                            <span
                              style={{
                                color:
                                  item.id == project.homepage ? "red" : "black",
                                fontWeight: "bold",
                                fontSize: "72%",
                                wordWrap: "break-word",
                              }}
                            >
                              {item.pageName}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                class="collapsible bounce"
                style={{
                  background: "rgb(255, 255, 255)",
                  padding: "5% 35% 3%",
                  textAlign: "center",
                }}
                onClick={() => {
                  let arrow = document.getElementById("collapsible1");
                  let down = document.getElementById("down");
                  if (setShowIcon) {
                    arrow.style.display = "block";
                    setShowIcon = false;
                    down.style.transform = "rotate(180deg)";
                  } else {
                    arrow.style.display = "none";
                    setShowIcon = true;
                    down.style.transform = "rotate(0deg)";
                  }
                }}
              >
                <BsChevronCompactDown class="resizeicon" size={25} id="down" />
              </div>
            </div>
          </div>
        </>
      </header>

      {videoNo.no === 1 && (
        <>
          <video
            poster={page?.backgroundImage?.url}
            autoPlay
            className={classes.transitionLoop}
            onEnded={() => {
              history.push(`/page/${videoNo.pageId}`);
            }}
            style={{ zIndex: videoNo.no === 1 ? 1000 : "" }}
          >
            <source src={videoNo.src} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <Button
            id="skipbtn"
            style={{
              color: `${project.secondaryColor}`,
              backgroundColor: `${project.primaryColor}`,
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: "2000",
              borderRadius: "15px",
            }}
            onClick={
              (() => setVideoNo(0),
              () => {
                history.push(`/page/${videoNo.pageId}`);
              })
            }
          >
            skip
          </Button>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({ project: state.project });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
