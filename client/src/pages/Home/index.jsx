/* eslint-disable no-unused-vars */
import './index.css'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../components/Navbar';
import nextIcon from '../../assets/nextArrow.png'
import { Footer } from '../../components/Footer';
export const Home = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/form`);
  }
  //bootstrap ki maa ki chut
  return (
    <div className='main-home'>
      <Navbar />
      <div className="home-content container-fluid row d-flex align-items-center justify-content-center">
        <div className="form-box col-md-5 form-box p-5 mx-auto d-flex flex-column align-items-start">
          {/* <h1 className="text-primary fw-bold my-3">Welcome to Slate.AI</h1> */}
          <div className='content-box w-75 mb-4'>
            <h1 className='text-secondary'>The Web Whiteboard for Instant Collaboration</h1>
          </div>
          <div className='d-flex'>
            <button onClick={handleClick} className='btn btn-outline-danger btn-lg'>
              Start Whiteboarding
              <img src={nextIcon} alt='icon' className='logo ms-3' />
            </button>
          </div>
        </div>
        <div className="form-box col-md-5 form-box d-flex justify-content-center align-items-center mx-auto overflow-hidden">
          <div className='img-wrapper border rounded-4 overflow-hidden'>
            <img src='https://picsum.photos/600/350' alt='img' />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
