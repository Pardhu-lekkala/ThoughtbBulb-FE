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
import { RiCloseFill } from "react-icons/ri";

import ReactPlayer from "react-player";

function updatePointer2(makrw, makrh, imagew, imageh) {
  let width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  let height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  const neww = (makrw / imagew) * width;
  const newh = (makrh / imageh) * height;
  let obj = { X: neww, Y: newh };

  const radiusw = (22 / imagew) * width;
  const radiush = (22 / imageh) * height;
  return {
    top: `${(obj.Y ^ 0) - radiush}px`,
    left: `${(obj.X ^ 0) - radiusw}px`,
  };
}

function Lobby({ history, project }) {
  let page = project.pages.find((e) => e.id === project.homepage);
  if (!page) {
    page = project.pages[0];
  }
  const classes = useStyles();
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);
  const [LabelIsOpen, setLabelIsOpen] = React.useState(true);

  const handleClickOpen = () => {
    document.getElementById("tooltips").href = "#popup-article";
    setLabelIsOpen(false);
  };

  const handleClose = () => {
    document.getElementById("tooltips").href = "";
    setLabelIsOpen(true);
  };

  const [videoNo, setVideoNo] = React.useState({
    no: 0,
    src: null,
    pageId: null,
  });

  const { height, width } = useWindowDimensions();

  const BGRef = React.useRef();

  const [BGwidth, setBGWidth] = React.useState();
  const [BGheight, setBGHeight] = React.useState();
  const [url, setUrl] = React.useState("");

  const isHover = false;

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
    if (BGwidth && BGheight) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        disablePictureInPicture
        poster={page?.backgroundImage?.url}
        className={classes.lobbyBG}
        autoPlay
        muted
        loop
        ref={BGRef}
      >
        <source src={localStorage.getItem("lobby")} type="video/mp4" />
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
                      <b style={{ fontSize: "1vw" }}>{item.markerLabel}</b>
                    }
                    placement="right"
                    arrow
                    open={LabelIsOpen}
                  >
                    <NewTooltip
                      key={index}
                      title={
                        <b style={{ fontSize: "1vw" }}>{item.markerLabel}</b>
                      }
                      placement="right"
                      arrow
                    >
                      <a
                        href="#"
                        className={classes.pulseAnimation}
                        id={index}
                        id="tooltips"
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
                            page?.backgroundImage?.width,
                            page?.backgroundImage?.height
                          ).left,
                        }}
                        onClick={() => {
                          setTooltipIsOpen(false);
                          let scrollDown =
                            document.getElementById("profile-menu");
                          scrollDown.style.display = "none";
                          if (item.destinationType === "PDF") {
                            setUrl(item.destinationLink);
                            handleClickOpen();
                          } else if (item.destinationType === "Link") {
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
                              : history.push(`/page/${item.destinationPage}`);
                          }
                        }}
                      ></a>
                    </NewTooltip>
                  </Tooltip>
                  <video
                    disablePictureInPicture
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
                      <a
                        href="#"
                        id="tooltips"
                        className={classes.pulseAnimation}
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
                            page?.backgroundImage?.width,
                            page?.backgroundImage?.height
                          ).left,
                        }}
                        onClick={() => {
                          setTooltipIsOpen(false);
                          let scrollDown =
                            document.getElementById("profile-menu");
                          scrollDown.style.display = "none";
                          if (item.destinationType === "PDF") {
                            setUrl(item.destinationLink);
                            handleClickOpen();
                          } else if (item.destinationType === "link") {
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
                              : history.push(`/page/${item.destinationPage}`);
                          }
                        }}
                      ></a>
                    </NewTooltip>
                  </Tooltip>
                  <video
                    disablePictureInPicture
                    src={item.TransVideo ? item.TransVideo.url : ""}
                    preload="auto"
                    style={{ display: "none" }}
                  />
                </>
              );
            }
          })}

          <div>
            <div id="popup-article" class="popup">
              <div class="popup__container">
                <a
                  href="#"
                  class="popup__close"
                  onClick={() => {
                    handleClose();
                    let scrollDown = document.getElementById("profile-menu");
                    scrollDown.style.display = "block";
                  }}
                >
                  <RiCloseFill size={30} />
                </a>
                <div class="popup__content">
                  <iframe
                    title="iframe"
                    src={url}
                    style={{ width: "90vw", height: "90vh" }}
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div
            id="profile-menu"
            class="profile-menu"
            style={{ background: "#ffffff", right: "60px", cursor: "pointer" }}
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
            <div class="profile-menu-header">
              <Tooltip
                arrow
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
                              if (item.id === project.homepage) {
                                alert(
                                  "Please note we are already on lobby page"
                                );
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
                                  item.id === project.homepage
                                    ? "red"
                                    : "black",
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
              >
                <BsChevronCompactDown class="resizeicon" size={25} id="down" />
              </div>
            </div>
          </div>

          {page?.video_areas?.map((item) => {
            const pointerObj = updatePointer2(
              +item?.position?.split(",")[0],
              +item?.position?.split(",")[1],
              +item?.position?.split(",")[2],
              +item?.position?.split(",")[3],
              page?.backgroundImage?.width,
              page?.backgroundImage?.height
            );
            return (
              <>
                <ReactPlayer
                  url={item.videoURL}
                  height={pointerObj.height}
                  width={pointerObj.width}
                  controls={true}
                  style={{
                    position: "relative",
                    top: pointerObj.Y1,
                    left: pointerObj.X1,
                  }}
                />
              </>
            );
          })}
        </>
      </header>

      {videoNo.no === 1 && (
        <>
          <video
            disablePictureInPicture
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
