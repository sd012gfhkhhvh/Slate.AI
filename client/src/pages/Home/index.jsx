/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import "./index.css";

//icons and images
import { MoveRight } from "lucide-react";
import demoImg from "../../assets/slateAI-canvas.png";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/form`);
  };
  return (
    <>
      <Navbar />

      <section className="flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center h-[100vh] w-[90vw] md:pt-20 max-w-[2000px] ">
          <div className="md:w-[50%] w-[100%] flex flex-col justify-center md:items-start items-center md:pt-20 md:justify-start h-[100%] ">
            <h1 className="w-[10ch] lg:text-6xl text-5xl font-semibold text-gray-500">
              The Web Whiteboard for Instant Collaboration
            </h1>
            <button
              onClick={handleClick}
              className="rounded-md hover:bg-[#c32f57] text-[#c32f57] hover:text-white transition-all border-2 border-solid border-[#c32f57] p-2 mt-3 font-bold text-xl flex justify-center items-center gap-2"
            >
              Start Whiteboarding
              <MoveRight />
            </button>
          </div>

          <div className="md:w-[50%] w-[100%] h-[100%] ">
            <div className="h-[100%]">
              <img
                className="md:h-[50%] object-contain shadow-lg"
                src={demoImg}
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
