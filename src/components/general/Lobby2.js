import React from "react";
import { connect } from "react-redux";
import useStyles from "./useStylesLobby";

//import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import useWindowDimensions from "./useWindowDimensions";

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

  console.clear();
  console.log(width, height);

  const neww = (makrw / imagew) * width;
  const newh = (makrh / imageh) * height;
  let obj = { X: neww, Y: newh };

  console.log({ X: (obj.X ^ 0) - 10, Y: (obj.Y ^ 0) - 10 });

  //<div class="marker1" style="position: absolute; top: 86px; left: 673px; width: 10px; height: 10px; background: rgb(255, 0, 0);"></div>

  return {
    top: `${(obj.Y ^ 0) - 12}px`,
    left: `${(obj.X ^ 0) - 12}px`,
  };
}

function Lobby({ history, page }) {
  const classes = useStyles();

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
            return (
              <>
                <Tooltip key={index} title={item.markerName} arrow>
                  <span
                    className={classes.pulseAnimation}
                    style={{
                      position: "relative",
                      //top: `${item?.markerPosition?.split(",")[1]}px`,
                      //left: `${item?.markerPosition?.split(",")[0]}px`,
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
                    onClick={() =>
                      item.TransVideo
                        ? setVideoNo({
                            no: 1,
                            src: item.TransVideo.url,
                            pageId: item.destinationPage,
                          })
                        : console.log("No Transition Video")
                    }
                  ></span>
                </Tooltip>
                <video
                  src={item.TransVideo ? item.TransVideo.url : ""}
                  preload="auto"
                  style={{ display: "none" }}
                />
              </>
            );
          })}
        </>
      </header>

      {videoNo.no === 1 && (
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
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  let page = state.project.pages.find((e) => e.id === state.project.homepage);
  if (page) {
    return { page };
  }
  return { page: {} };
};

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
