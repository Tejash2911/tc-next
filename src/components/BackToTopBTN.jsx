"use client";
import { useEffect, useState } from "react";
import { KeyboardDoubleArrowUp } from "@mui/icons-material";

export default function BackToTopBTN() {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    });
  }, []);

  const HandleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={`fixed bottom-10 right-10 z-50 ${isShow && "hidden"}`}>
      <div className="flex items-center justify-center bg-white border-2 border-black scale-150 cursor-pointer rounded-full transition-all ease-in-out hover:bg-black hover:text-white">
        <KeyboardDoubleArrowUp onClick={HandleClick} />
      </div>
    </div>
  );
}
