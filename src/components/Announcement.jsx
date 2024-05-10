"use client";
import { publicRequest } from "@/axiosRequestMethods";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 40px;
  // height: 4vh;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  letter-spacing: 2px;
  word-spacing: 5px;
`;

const Announcement = () => {
  const [announcment, setAnnouncment] = useState("");

  useEffect(() => {
    const fetchh = async () => {
      const res = await publicRequest.get(`/api/announcment`);
      setAnnouncment(res.data);
    };
    fetchh();
  }, []);
  return (
    <>
      {announcment && (
        <Container>
          <marquee direction="left" scrollamount="15">
            {announcment.title}
          </marquee>
        </Container>
      )}
    </>
  );
};

export default Announcement;
