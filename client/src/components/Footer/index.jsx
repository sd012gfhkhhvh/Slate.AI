import "./index.css"
import slateLogo from '../../assets/SlateAI-Logo.png'
import linkedin from '../../assets/linkedin.png'
import twitter from '../../assets/twitter.png'
import insta from '../../assets/instagram.png'
import mail from '../../assets/mailIcon.png'

export const Footer = () => {
  return (
    <div className='footer container-fluid d-flex justify-content-between align-items-center'>
      <div className="d-flex justify-content-between align-items-center">
        <img className="logo ms-5 me-3" src={slateLogo} alt="img" />
        <span className="text-secondary h5"> &#169; 2024 Slate.AI</span>
      </div>
      {/* socials */}
      <div className="socials d-flex flex-column">
        <p className="ms-3 text-secondary fs-5">{`Let's Connect`}</p>
        <div className="d-flex justify-content-around align-items-center">
          <a href={'https://www.linkedin.com/in/soham-das-15ab07174/'}>
            <img className="logo-social ms-2" src={linkedin} alt='img' />
          </a>
          <a href={'https://twitter.com/Soham__Das_'}>
            <img className="logo-social ms-2" src={twitter} alt='img' />
          </a>
          <a href={'https://www.instagram.com/soham_das_/'}>
            <img className="logo-social ms-2" src={insta} alt='img' />
          </a>
          <a href={'mailto: sohamdas.nest@gmail.com'}>
            <img className="logo-social ms-2" src={mail} alt='img' />
          </a>
        </div>
      </div>
    </div>
  )
}
