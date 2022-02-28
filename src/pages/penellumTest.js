import React from "react";
import ReactDOM from "react-dom";
import { Pannellum } from "pannellum-react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function Panellum() {
  function imagetAlert() {
    Swal.fire({
      title: "This Is Your Marker Image",
      imageUrl:
        "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
      imageWidth: "90%",
      imageHeight: "90%",
      imageAlt: "...",
      confirmButtonText: "Cancel",
      confirmButtonColor: "#6e6c69",
      reverseButtons: true,
    });
  }
  const history = useHistory();
  return (
    <div className="App">
      <Pannellum
        width="100%"
        height="100vh"
        image="https://cdn.sandals.com/sandals/wallpapers/panorama-test.jpeg"
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        autoRotate={10}
        showZoomCtrl={false}
        //showControls={true}
        onLoad={() => {
          console.log("image loaded");
        }}
      >
        <Pannellum.Hotspot
          // onClick={() => {
          //   history.push("/roundme");
          // }}
          type="custom"
          pitch={31}
          yaw={150}
          handleClick={(evt, name) =>
            history.push({
              pathname: "/roundme",
              state: {
                videoUrl: "https://roundme.com/embed/sS5z1911RPgCNbOI28pj",
              },
            })
          }
          name="hs1"
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={20}
          yaw={100}
          handleClick={(evt, name) => imagetAlert()}
          name="hs1"
        />
      </Pannellum>
    </div>
  );
}

export default Panellum;
