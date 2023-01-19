import React from "react";
import styled from "styled-components";
import hausBlockAnimated from "../assets/hausBlockAnimated.svg";
import pixelPub from "../assets/pixel_pub.gif";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
  margin-bottom: 2rem;
  .img-block {
    display: flex;
    align-items: center;
  }
  img {
    width: 40rem;
    z-index: -1;
  }
`;

export const HausAnimated = () => {
  return (
    <ImageContainer>
      <div className="img-block">
        <img src={pixelPub} />
      </div>
    </ImageContainer>
  );
};
