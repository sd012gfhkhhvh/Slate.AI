import githubIcon from "../../assets/github.png";
import logo from "../../assets/SlateAI-Logo.png";
export const Navbar = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex  bg-clip-padding  fixed z-30 justify-center items-center bg-white top-0 w-[100vw] border-black border-solid border-b-[1px] ">
        <div className="flex rounded-md px-4 py-1  h-[60px] md:h-[80px] bg-white justify-between items-center w-[100%] max-w-[1200px]">
          <div className="">
            <div className="flex my-4  justify-center items-center ">
              <div className="">
                <img
                  className="w-[30px] md:w-[40px] lg:w-[50px] h-auto object-cover transition-all"
                  src={logo}
                  alt="logo"
                />
              </div>
              <h2 className="lg:text-4xl md:text-3xl text-2xl transition-all">
                Slate.AI
              </h2>
            </div>
          </div>

          <div>
            <a
              href={"https://github.com/sd012gfhkhhvh/Slate.AI"}
              className=" no-underline bg-white text-black font-semibold px-2 py-1 flex justify-center items-center gap-2 transition-all border-black border-solid border-[2px] rounded-lg lg:text-xl md:text-lg text-md "
            >
              <img
                className="lg:w-[40px] md:w-[30px] w-[20px] transition-all"
                src={githubIcon}
                alt="img"
              />
              <span className="">Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
