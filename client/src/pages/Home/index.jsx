/* eslint-disable no-unused-vars */
import './index.css'
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/form`);
  }
  return (
    <div className="container-fluid mt-5 row h-100 w-100 pt-5">
    <div className="form-box col-md-4 mt-5 form-box p-5 mx-auto d-flex flex-column align-items-start">
        <h1 className="text-primary fw-bold">Slate AI</h1>
        <p>A Platform For collaborative drawing.</p>
        <button onClick={handleClick} className='btn btn-outline-primary'>Go Live</button>
    </div>
    <div className="form-box col-md-5 form-box d-flex justify-content-center rounded-4 mx-auto overflow-hidden">
        <img src='https://picsum.photos/500/350' alt='img'/>
    </div>
</div>
  )
}
