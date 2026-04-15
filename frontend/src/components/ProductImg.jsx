import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function ProductImg({ images }) {
  const [mainImg, setMainImg] = useState(null);
  return (
    <div className="flex gap-5 w-max">
      <div className="gap-5 flex flex-col">
        {images?.map((img, index) => (
          <img
            key={index}
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt=""
            className="cursor-pointer w-20 h-20 border shadow-lg"
          />
        ))}
      </div>
      <Zoom>
        {mainImg || images?.[0]?.url ? (
          <img
            src={mainImg || images[0].url}
            alt=""
            className="w-[500px] border shadow-lg"
          />
        ) : (
          <div className="w-[500px] h-[500px] bg-gray-100 animate-pulse" />
        )}
      </Zoom>
    </div>
  );
}

export default ProductImg;
