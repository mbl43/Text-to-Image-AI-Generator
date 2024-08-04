import React, { useRef, useState } from "react";
import default_img from "../assets/main.jpg";

const Imagegen = () => {
  const [image_url, setimage_url] = useState("/");
  let inputref = useRef(null);
  const imagegenerator = async () => {
    if (inputref.current.value=== "") {
      return 0;
    }
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1-base",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputref.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setimage_url(data_array[0].url);
  };
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center  flex-column">
      <div className="header fs-1 fw-bold text-white pb-2">
        Ai Image<span> Generator</span>
      </div>

      <div className="img-loading ">
        <div className="image d-flex justify-content-center align-items-center ">
          <img
            src={image_url === "/" ? default_img : image_url}
            alt="img"
            className="rounded-4 w-75"
          />
        </div>
      </div>
      <div className="searchbox mt-2 vw-100 d-flex justify-content-center align-items-center  flex-row">
        <input
          placeholder="Enter Your Promt"
          ref={inputref}
          type="text"
          className="border-white rounded-2 p-2 w-25"
        />
        <button
          className="border fw-bold m-2 p-2 rounded-2 border-2 border-white"
          onClick={() => {
            imagegenerator();
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Imagegen;
