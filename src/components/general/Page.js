import { Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import useStyles from "./useStylesPage";
import { BiArrowBack } from "react-icons/bi";

import useWindowDimensions from "./useWindowDimensions";

import ReactPlayer from "react-player";

function Page({ history, match, pages, primaryColor, secondaryColor }) {
  const classes = useStyles();

  //const scrollRef = React.useRef(null);

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
    //let imagew = 1920;
    //let imageh = 1080;
    //console.log(imagew, imageh)
    // console.log(makrw1, makrh2);

    // console.log(width + " screen width " + height);

    console.clear();
    console.log(width, height);

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

    console.log(coordinates);

    //<div class="marker1" style="position: absolute; top: 86px; left: 673px; width: 10px; height: 10px; background: rgb(255, 0, 0);"></div>

    return {
      ...coordinates,
      width: (obj.X2 ^ 0) - 12 - ((obj.X1 ^ 0) - 12),
      height: (obj.Y2 ^ 0) - 12 - ((obj.Y1 ^ 0) - 12),
      /* width: (obj.X2 ^ 0) - 12 - ((obj.X1 ^ 0) - 12),
      height: (obj.Y2 ^ 0) - 12 - ((obj.Y1 ^ 0) - 12), */
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
    //console.log("CALCULATING NEW DIM.", { width: newWidth, height: newHeight });
  };

  // Get 'width' and 'height' after the initial render and every time the window height/width changes
  React.useEffect(() => {
    getBGSize();
  }, [height, width]);

  React.useEffect(() => {
    console.log(match.params.pageId);
    if (match?.params?.pageId) {
      const p = pages?.find((e) => +e.id === +match.params.pageId);
      console.log(p);
      console.log(pages);
      p ? setPage(p) : setPage(null);
    }
    // window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {page && (
        <>
          <Button
        style={{
          top: "20px",
          left: "20px",
          position:"absolute",
          zIndex: "2300",
          color: `${secondaryColor}`,
          backgroundColor: `${primaryColor}`,
          borderRadius:"15px"
        }}
        onClick={() => {history.push("/Lobby");}}
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
                <ReactPlayer
                  //url={"https://vimeo.com/253989945"}
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
              );
            })}
          </header>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({ pages: state.project.pages, primaryColor:state.project.primaryColor, secondaryColor:state.project.secondaryColor });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

/* <iframe
                  title={item.name}
                  height={pointerObj.height}
                  width={pointerObj.width}
                  style={{
                    position: "relative",
                    top: pointerObj.Y1,

                    left: pointerObj.X1,
                  }}
                  src="https://www.youtube.com/embed/d5UMg-_ASOs"
                ></iframe> 
                
 
                item.videoType !== "Youtube" ? (
                <video
                  height={pointerObj.height}
                  width={pointerObj.width}
                  style={{
                    position: "relative",
                    top: pointerObj.Y1,

                    left: pointerObj.X1,
                  }}
                >
                  <source src={item.videoURL} type="video/mp4" />
                </video>
              ) : (
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
              )
                */
