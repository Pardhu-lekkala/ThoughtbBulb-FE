import React from "react";

import { connect } from "react-redux";

import useStyles from "./useStylesPage";
import "../../styles/componentStyles/lobby.css";
import useWindowDimensions from "./useWindowDimensions";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

import { BiArrowBack } from "react-icons/bi";
import { BsChevronCompactDown } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";

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

function Page({ history, match, project }) {
  const pages = project.pages;
  const primaryColor = project.primaryColor;
  const secondaryColor = project.secondaryColor;
  const classes = useStyles();

  const [page, setPage] = React.useState(null);

  function updatePointer(makrw1, makrh1, makrw2, makrh2, imagew, imageh) {
    let width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    const neww1 = (makrw1 / imagew) * width;
    const newh1 = (makrh1 / imageh) * height;
    const neww2 = (makrw2 / imagew) * width;
    const newh2 = (makrh2 / imageh) * height;
    let obj = { X1: neww1, Y1: newh1, X2: neww2, Y2: newh2 };

    const coordinates = {
      Y1: `${(obj.Y1 ^ 0) - 12}px`,
      X1: `${(obj.X1 ^ 0) - 12}px`,
      Y2: `${(obj.Y2 ^ 0) - 12}px`,
      X2: `${(obj.X2 ^ 0) - 12}px`,
    };

    return {
      ...coordinates,
      width: (obj.X2 ^ 0) - 12 - ((obj.X1 ^ 0) - 12),
      height: (obj.Y2 ^ 0) - 12 - ((obj.Y1 ^ 0) - 12),
    };
  }

  const { height, width } = useWindowDimensions();

  // This ref is connected to the BG
  const BGRef = React.useRef();

  // The size of the BG // It will be updated later
  const [BGwidth, setBGWidth] = React.useState();
  const [BGheight, setBGHeight] = React.useState();

  // This function calculates width and height of the BG
  const getBGSize = () => {
    const newWidth = BGRef?.current?.clientWidth;
    setBGWidth(newWidth);

    const newHeight = BGRef?.current?.clientHeight;
    setBGHeight(newHeight);
  };

  // Get 'width' and 'height' after the initial render and every time the window height/width changes
  React.useEffect(() => {
    getBGSize();
    if (BGwidth && BGheight) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width]);

  React.useEffect(() => {
    if (match?.params?.pageId) {
      const p = pages?.find((e) => +e.id === +match.params.pageId);
      p ? setPage(p) : setPage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let icon = 0;
  let loginCredentials = localStorage.getItem("email");

  const [isChatOpen, setChatOpen] = React.useState(true);
  const [hideChatSpinner, setHideChatSpinner] = React.useState(false);

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);
  const [LabelIsOpen, setLabelIsOpen] = React.useState(true);
  const [url, setUrl] = React.useState("");

  const isHover = false;

  const handleClickOpen = () => {
    document.getElementById("tooltips").href = "#popup-article";
    setLabelIsOpen(false);
  };

  const [videoNo, setVideoNo] = React.useState({
    no: 0,
    src: null,
    pageId: null,
  });

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

  return (
    <>
      <div
        id="profile-menu"
        class="profile-menu"
        style={{ background: "#ffffff", right: "60px" }}
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
                size={50}
                color="black"
                style={{ paddingTop: "5px" }}
              />
            </a>
          </Tooltip>
          <div id="collapsible1" style={{ display: "none" }}>
            <div class="spacer" style={{ backgroundColor: "#5b5b5b" }}></div>
            {pages.map((item) => (
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
                            history.push(`/lobby`);
                          } else if (item.id === match.params.pageId) {
                            alert(`already in ${item.pageName}`);
                          } else {
                            history.push(`/page/${item.id}`);
                            window.location.reload();
                          }
                          // console.log("this is the one", history);
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
                              item.id === match.params.pageId ? "red" : "black",
                            fontWeight: "bold",
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
              padding: "5px 0px 2px 0px",
              textAlign: "center",
            }}
            onClick={() => {
              let arrow = document.getElementById("collapsible1");
              let down = document.getElementById("down");
              if (icon === 0) {
                arrow.style.display = "block";
                icon++;
                down.style.transform = "rotate(180deg)";
              } else {
                arrow.style.display = "none";
                icon--;
                down.style.transform = "rotate(0deg)";
              }
            }}
          >
            <BsChevronCompactDown size={25} id="down" />
          </div>
        </div>
      </div>
      {page && (
        <>
          <Button
            style={{
              top: "20px",
              left: "20px",
              position: "absolute",
              zIndex: "2300",
              color: `${secondaryColor}`,
              backgroundColor: `${primaryColor}`,
              borderRadius: "15px",
            }}
            onClick={() => {
              history.push("/Lobby");
            }}
          >
            <BiArrowBack size={25} />
          </Button>
          <video
            poster={page?.backgroundImage?.url}
            className={classes.pageBG}
            autoPlay
            muted
            loop
            ref={BGRef}
          >
            <source src={page?.backgroundVideo?.url} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          <header className={classes.viewportHeader}>
            {page?.markers?.map((item, index) => {
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
                          <b style={{ fontSize: "0.8vw" }}>
                            {item.markerLabel}
                          </b>
                        }
                        placement="top"
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
                          <b style={{ fontSize: "0.8vw" }}>
                            {item.markerLabel}
                          </b>
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
                      src={item.TransVideo ? item.TransVideo.url : ""}
                      preload="auto"
                      style={{ display: "none" }}
                    />
                  </>
                );
              }
            })}

            {page.video_areas.map((item) => {
              const pointerObj = updatePointer(
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

                  {item.videoType === "Vimeo" &&
                    item.videoURL.indexOf("event") > -1 && (
                      <>
                        <Fab
                          style={{
                            margin: 0,
                            top: "auto",
                            right: 20,
                            bottom: 20,
                            left: "auto",
                            position: "fixed",
                          }}
                          color="primary"
                          aria-label="add"
                          onClick={() => {
                            setChatOpen((toggle) => !toggle);
                          }}
                        >
                          <ChatBubbleIcon
                            style={{
                              display: hideChatSpinner ? "block" : "none",
                            }}
                          />
                          <CircularProgress
                            style={{
                              display: !hideChatSpinner ? "block" : "none",
                              color: project.secondaryColor,
                            }}
                          />
                        </Fab>

                        {isChatOpen && (
                          <div
                            style={{
                              margin: 0,
                              top: "auto",
                              right: 20,
                              bottom: 80,
                              left: "auto",
                              position: "fixed",
                              height: "72%",
                              width: "25%",
                              border: "0px",
                              backgroundColor: "white",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                setChatOpen(false);
                              }}
                              style={{
                                right: 21,
                                bottom: "auto",
                                left: "auto",
                                position: "fixed",
                                marginTop: "10px",
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                            <CircularProgress
                              style={{
                                display: !hideChatSpinner ? "block" : "none",
                                margin: "50% auto",
                                color: project.secondaryColor,
                              }}
                            />
                            <iframe
                              src={item.videoURL + "/chat"}
                              title="chat"
                              style={{
                                height: "100%",
                                width: "100%",
                                display: hideChatSpinner ? "block" : "none",
                              }}
                              onLoad={() => {
                                setHideChatSpinner(true);
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                </>
              );
            })}
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
      )}
    </>
  );
}

const mapStateToProps = (state) => ({ project: state.project });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
