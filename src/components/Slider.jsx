"use client";
import styled from "styled-components";
import { hero } from "@/utils/dummyData";
import { mobile } from "@/responsive";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  /* ${mobile({
    display: "none",
  })}  */
`;
const ImageWrapper = styled.div`
  width: 100%;
  max-height: 65vh;
  overflow: hidden;
`;

const Info = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;

  @media only screen and (max-width: 900px) {
    align-items: flex-start;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-family: "Alfa Slab One", cursive;

  @media only screen and (max-width: 900px) {
    font-size: 20px;
  }
`;
const Description = styled.span`
  font-family: "Hanken Grotesk", sans-serif;
`;
const Button = styled.button`
  margin-bottom: 5px;
  font-family: "Hanken Grotesk", sans-serif;
  border-radius: 2vmax;
  background-color: black;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const Slider = () => {
  const index = Math.floor(Math.random() * 8) + 1;
  const heroInfo = hero[0];

  const router = useRouter();

  return (
    <Container>
      <ImageWrapper>
        <Image
          src="https://themanufacturer-cdn-1.s3.eu-west-2.amazonaws.com/wp-content/uploads/2018/07/14113818/Depositphotos_160634808_m-2015.jpg"
          alt="banner-img"
          width={999}
          height={667}
          priority={true}
          className="image"
        />
      </ImageWrapper>
      <Info>
        <Title>{heroInfo.title}</Title>
        <Description>{heroInfo.description}</Description>
        <Button onClick={() => router.push("products/all")}>{heroInfo.cta}</Button>
      </Info>
    </Container>
  );
};

export default Slider;
