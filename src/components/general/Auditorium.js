import React from "react";
import { connect } from "react-redux";
import useStyles from "./useStylesAuditorium";

const AuditoriumImg =
  "https://platoodemo.s3.ap-south-1.amazonaws.com/assets/Auditorium.jpg";

function Auditorium({ history }) {
  const classes = useStyles();

  //const scrollRef = React.useRef(null);

  React.useEffect(() => {
    // window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <video
        disablePictureInPicture
        controls={false}
        controlsList="nodownload"
        playsInline
        poster={AuditoriumImg}
        className={classes.AuditoriumBG}
        autoPlay
        muted
        loop
      >
        {/* <source src={LobbyVideo} type="video/mp4" /> */}
        Your browser does not support HTML5 video.
      </video>
      <header className={classes.viewportHeader}></header>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Auditorium);
