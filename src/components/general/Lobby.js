import React from "react";
import { connect } from "react-redux";
import useStyles from "./useStylesLobby";
import "../../styles/componentStyles/lobby.css";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { BsChevronCompactDown } from "react-icons/bs";
import useWindowDimensions from "./useWindowDimensions";
import Fade from "@material-ui/core/Fade";

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

function updatePointer2(makrw, makrh, imagew, imageh) {
  let width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  let height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  //let imagew = 1920;
  //let imageh = 1080;
  //console.log(imagew, imageh)
  // console.log(makrw, makrh);

  // console.log(width + " screen width " + height);

  // console.clear();
  console.log(width, height);

  const neww = (makrw / imagew) * width;
  const newh = (makrh / imageh) * height;
  let obj = { X: neww, Y: newh };

  console.log({ X: (obj.X ^ 0) - 10, Y: (obj.Y ^ 0) - 10 });

  //<div class="marker1" style="position: absolute; top: 86px; left: 673px; width: 10px; height: 10px; background: rgb(255, 0, 0);"></div>
  const radiusw = (22 / imagew) * width;
  const radiush = (22 / imageh) * height;
  return {
    top: `${(obj.Y ^ 0) - radiush}px`,
    left: `${(obj.X ^ 0) - radiusw}px`,
  };
}

function Lobby({ history, project }) {
  const page = project.pages.find((e) => e.id === project.homepage);
  const classes = useStyles();
  // const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);

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

  // This function calculates width and height of the BG
  const getBGSize = () => {
    const newWidth = BGRef.current.clientWidth;
    setBGWidth(newWidth);

    const newHeight = BGRef.current.clientHeight;
    setBGHeight(newHeight);
    //console.log("CALCULATING NEW DIM.", { width: newWidth, height: newHeight });
  };

  // Get 'width' and 'height' after the initial render and every time the window height/width changes
  React.useEffect(() => {
    getBGSize();
  }, [height, width]);

  //const scrollRef = React.useRef(null);

  React.useEffect(() => {
    //getBGSize();
    // console.log(page);
    // window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let icon = 0;
  let pageLoaded=true;
  

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
        <source src={page?.backgroundVideo?.url} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <header className={classes.viewportHeader}>
        <>
          {/* {console.log(page.markers)} */}
          {page.markers.map((item, index) => {
            if(item.VisibileLabel){return (
              <>
              <Tooltip key={index} title={item.markerLabel} placement="top" arrow open={true}>
                <span
                  className={classes.pulseAnimation}
                  style={{
                    backgroundColor: project.markerColor,
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
                    let scrollDown = document.getElementById("profile-menu");
                    scrollDown.style.display = "none";
                    if(item.destinationType!="Link")
                    {
                    item.TransVideo
                      ? setVideoNo({
                          no: 1,
                          src: item.TransVideo.url,
                          pageId: item.destinationPage,
                        })
                      : console.log("No Transition Video");
                    }
                    else{
                      window.open(item.destinationLink);
                    }
                  }}
                ></span>
              </Tooltip>
               <video
               src={item.TransVideo ? item.TransVideo.url : ""}
               preload="auto"
               style={{ display: "none" }}
             />
             </>
            );}
            else{
            return (
              <>
              <Tooltip key={index} title={item.markerLabel} placement="top" arrow leaveDelay={300} TransitionComponent={Fade}
              TransitionProps={{ timeout: 400 }}  >
                <span
                  className={classes.pulseAnimation}
                  style={{
                    backgroundColor: project.markerColor,
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
                    let scrollDown = document.getElementById("profile-menu");
                    scrollDown.style.display = "none";
                    if(item.destinationType!="Link")
                    {
                    item.TransVideo
                      ? setVideoNo({
                          no: 1,
                          src: item.TransVideo.url,
                          pageId: item.destinationPage,
                        })
                      : console.log("No Transition Video");
                    }
                    else{
                      window.open(item.destinationLink);
                    }
                  }}
                ></span>
              </Tooltip>
              <video
                  src={item.TransVideo ? item.TransVideo.url : ""}
                  preload="auto"
                  style={{ display: "none" }}
                />
                </>
              
            );}
          })}
          <div
            id="profile-menu"
            class="profile-menu"
            style={{ background: "#ffffff", right: "60px" }}
          >
            <div class="profile-menu-header">
              <a
                id="profile-menu-user"
                class="profile-menu-user"
                href="javascript:void(0);"
              >
                <img
                  class="img-100 user-profile"
                  src="https://conference-project-db.s3.amazonaws.com/1628761365_102a0529e9.png"
                  alt="User profile"
                />
              </a>
              <div id="collapsible1" style={{ display: "none" }}>
                {project.pages.map((item) => (
                  <div class="collapsible-container">
                    <div 
                      class="content"
                      style={{
                        background: "rgb(255, 255, 255)",
                        maxHeight: "547px",
                        display: item.id==project.homepage?"none":"block"
                      }}
                      
                    >
                      <div class="icon-links">
                        <div
                          class="spacer"
                          style={{ backgroundColor: "#5b5b5b" }}
                        ></div>
                        <div>
                          <a
                            id="link"
                            onClick={() => {
                                history.push(`/page/${item.id}`);
                            }}
                            
                          >
                            <img
                              class="img-100"
                              src={item.pageIcon.url}
                              alt={item.pageName}
                            />
                            <span style={{ color: project.secondaryColor }}>
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
                  if (icon == 0) {
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
        </>
      </header>

      {videoNo.no === 1 && (
        <>
          <video
            poster={page?.backgroundImage?.url}
            autoPlay
            //muted
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
              borderRadius:"15px"
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

// const mapStateToProps = (state) => {
//   let page = state.project.pages.find((e) => e.id === state.project.homepage);
//   if (page) {
//     return { page };
//   }
//   return { page: {} };
// };
const mapStateToProps = (state) => ({ project: state.project });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

/* 
//320,574, //funzone
//652, 530, //beach
//946, 614, //helpdesk
top: updatePointer(
                      BGwidth,
                      BGheight,
                      {
                        width: page?.backgroundImage?.width,
                        height: page?.backgroundImage?.height,
                      },
                      {
                        x: +item?.markerPosition?.split(",")[0],
                        y: +item?.markerPosition?.split(",")[1],
                      }
                    ).top,
                    left: updatePointer(
                      BGwidth,
                      BGheight,
                      {
                        width: page?.backgroundImage?.width,
                        height: page?.backgroundImage?.height,
                      },
                      {
                        x: +item?.markerPosition?.split(",")[0],
                        y: +item?.markerPosition?.split(",")[1],
                      }
                    ).left,
*/
