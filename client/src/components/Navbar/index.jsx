import "./index.css";
import githubIcon from "../../assets/github.png";
import logo from "../../assets/slateAI-logo-dark.png";
export const Navbar = () => {
  return (
    <div className="main-nav container-fluid d-flex justify-content-between align-items-center">
      <div>
        <img className="main-logo ms-5" src={logo} alt="logo" />
      </div>
      <a
        href={"https://github.com/sd012gfhkhhvh/Slate.AI"}
        className=" flex justify-center items-center bg-white p-2 text-black none rounded-md gap-1 font-bold no-underline"
      >
        <img className="w-[30px]" src={githubIcon} alt="img" />
        <span className="">Github</span>
      </a>
    </div>
  );
};
