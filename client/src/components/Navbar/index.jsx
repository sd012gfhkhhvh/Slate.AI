import "./index.css";
import githubIcon from "../../assets/github.png";
import logo from "../../assets/slateAI-logo-dark.png";
export const Navbar = () => {
  return (
    <div className=" h-[15%] bg-[#23232e] flex justify-between align-center">
      <div>
        <img className="h-[7rem] ml-5" src={logo} alt="logo" />
      </div>
      <a
        href={"https://github.com/sd012gfhkhhvh/Slate.AI"}
        className="p-3 py-4 rounded-md h-[30px] mt-8 flex justify-center items-center gap-2 no-underline text-black mr-8 font-bold bg-white"
      >
        <span className="">Github</span>
        <img className="w-[20px] h-[20px]" src={githubIcon} alt="img" />
      </a>
    </div>
  );
};
