import React from "react";

import { connect } from "react-redux";

import useStyles from "./useStylesPage";
import "../../styles/componentStyles/lobby.css";
import useWindowDimensions from "./useWindowDimensions";

import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import { BiArrowBack } from "react-icons/bi";
import { BsChevronCompactDown } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";

import ReactPlayer from "react-player";

function getVimeoId(url) {
  // Look for a string with 'vimeo', then whatever, then a
  // forward slash and a group of digits.
  var match =
    /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/.exec(
      url
    );

  // If the match isn't null (i.e. it matched)
  if (match) {
    // The grouped/matched digits from the regex
    return match[match.length - 1];
  } else {
    return null;
  }
}

function Page({ history, match, project }) {
  // console.log(history);
  const pages = project.pages;
  const primaryColor = project.primaryColor;
  const secondaryColor = project.secondaryColor;
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

    // console.clear();
    // console.log(width, height);

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

    // console.log(coordinates);

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
  let icon = 0;
  let loginCredentials = localStorage.getItem("email");
  //console.log(loginCredentials);

  const [isChatOpen, setChatOpen] = React.useState(false);

  return (
    <>
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
                    // display: item.id == project.homepage||item.id==match.params.pageId ? "none" : "block",
                  }}
                >
                  <div class="icon-links">
                    <div style={{ backgroundColor: "#5b5b5b" }}></div>
                    <div>
                      <a
                        id="link"
                        onClick={() => {
                          if (item.id == project.homepage) {
                            history.push(`/lobby`);
                          } else if (item.id == match.params.pageId) {
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
                              item.id == match.params.pageId ? "red" : "black",
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
            {page.video_areas.map((item) => {
              const pointerObj = updatePointer(
                +item?.position?.split(",")[0],
                +item?.position?.split(",")[1],
                +item?.position?.split(",")[2],
                +item?.position?.split(",")[3],
                page?.backgroundImage?.width,
                page?.backgroundImage?.height
              );
              console.log(item);
              return (
                <>
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
                          <ChatBubbleIcon />
                        </Fab>

                        {isChatOpen && (
                          <>
                            <iframe
                              src={item.videoURL + "/chat"}
                              title="chat"
                              style={{
                                margin: 0,
                                top: "auto",
                                right: 20,
                                bottom: 80,
                                left: "auto",
                                position: "fixed",
                                height: "450px",
                                width: "300px",
                                border:"0px"
                              }}
                            />
                          </>
                        )}
                      </>
                    )}
                </>
              );
            })}
          </header>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({ project: state.project });
// const mapStateToProps = (state) => ({ pages: state.project.pages, primaryColor:state.project.primaryColor, secondaryColor:state.project.secondaryColor });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

/* 
src={`https://vimeo.com/event/${getVimeoId(
                          item.videoURL
                        )}/chat/`}
<iframe
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
