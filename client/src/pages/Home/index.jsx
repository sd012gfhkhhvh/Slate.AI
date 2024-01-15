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
  //bootstrap ki maa ki chut
  return (
    <div className="main-home">
      <Navbar />
      <div className="home-content container-fluid row d-flex align-items-center justify-content-center">
        <div className="form-box col-md-5 form-box p-5 mx-auto d-flex flex-column align-items-start">
          <div className="content-box w-75 mb-4">
            <h1 className="text-secondary">
              The Web Whiteboard for Instant Collaboration
            </h1>
          </div>
          <div className="d-flex">
            <button
              onClick={handleClick}
              className="p-2 flex gap-2 hover:bg-red-900 hover:text-white font-semibold transition-all text-red-900 rounded-md border-red-900 border-2 border-solid"
            >
              Start Whiteboarding
              <MoveRight />
            </button>
          </div>
        </div>
        <div className="form-box col-md-5 form-box d-flex justify-content-center align-items-center mx-auto overflow-hidden">
          <div className="img-wrapper border border-black rounded-4 overflow-hidden">
            <img
              className="container-fluid h-100 p-0"
              src={demoImg}
              alt="img"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
