import React from 'react'
import playStore from "../../PlayStore.png"
import appStore from "../../AppStore.png"
import "./Footer.css"

const Footer = () => {

  const date = new Date();

  console.log(date)
  
  return (
    <>
    <footer id="footer">

        <div className="leftFooter">

            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android And IOS mobile Phone</p>
            <img src={playStore} title="Playstore" alt="playStore" />
            <img src={appStore} title="Appstore" alt="appStore" />

        </div>

        <div className="midFooter">

            <h1>Ecommerce</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights {date.getFullYear()} &copy; - <span>Harshit Kumar</span></p>
        
        </div>

        <div className='rightFooter'>

            <h4>Follow Us</h4>
            <a href="https://www.instagram.com/harshitdreams8a_/" target="_blank" title="Instagram">Instagram</a>
            <a href="https://www.youtube.com/c/WTCsociety" target="_blank" title="Youtube">Youtube</a>
            <a href="https://www.linkedin.com/in/harshit-kumar-9b4474206/" target="_blank" title="LinkedIN">LinkedIN</a>

        </div>

    </footer>
    </>
  )
}

export default Footer