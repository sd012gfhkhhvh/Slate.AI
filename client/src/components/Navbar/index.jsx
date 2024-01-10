import './index.css'
import githubIcon from '../../assets/github.png'
import logo from '../../assets/slateAI-logo-dark.png'
export const Navbar = () => {
  return (
    <div className="main-nav container-fluid d-flex justify-content-between align-items-center">
      <div>
        <img className="main-logo ms-5" src={logo} alt="logo" />
      </div>
      <a href={'https://github.com/sd012gfhkhhvh/Slate.AI'} className='btn btn-outline-light btn-sm px-3 rounded-5'>
        <span className=''>Github</span>
        <img className="logo ms-2" src={githubIcon} alt='img' />
      </a>
    </div>
  )
}
