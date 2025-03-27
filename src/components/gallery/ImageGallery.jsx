import React, { useState } from "react";
import { apiURL } from "../../../helper";
import { Image } from "antd";
export function ImageGallery({ images }) {
  const [active, setActive] = useState();

  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active ?? (images && apiURL + images[0]?.imagePath)}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images?.map((item, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(apiURL + item.imagePath)}
              src={apiURL + item.imagePath}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}