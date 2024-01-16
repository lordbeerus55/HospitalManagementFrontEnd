import React, { useEffect, useState } from "react";
import ImageList from "./ImageList";
import GlobalApi from "../../Services/GlobalApi";

function Slider() {
  const [sliderimagess, setSliderimagess] = useState([]);
  useEffect(() => {
    getSliderimages();
  }, []);
  const getSliderimages = () => {
    GlobalApi.getSliderimages().then((resp) => {
      const resp1 = { data: resp.data };
      setSliderimagess(resp1.data);
    });
  };

  return (
    <div className="App" style={{marginTop:'-30px',marginBottom:'30px',overflowX:'hidden'}}>
      <ImageList images={sliderimagess.map((image) => image.photo)} />
    </div>
  );
}

export default Slider;
