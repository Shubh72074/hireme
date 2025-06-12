import {
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import {FaXTwitter} from 'react-icons/fa6'
import "./footer.css";
import { Link } from "react-router-dom";
import Logo from "../../utils/logo";
import { MdCall, MdEmail, MdWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <section className="connect-with-us">
          <Logo/>
          <p>Join our community and stay updated with the latest news and updates.
          Subscribe to our newsletter for exclusive content and offers.</p>
          <ul className="social-links">
            <li>
              <Link to={"https://www.instagram.com/shubh72074"}><AiOutlineInstagram size={'18px'} /></Link>
            </li>
            <li>
              <Link to={"https://www.youtube.com/@shubh555"}><AiFillYoutube size={'18px'} /></Link>
            </li>
            <li>
              <Link to={"https://www.linkedin.com/in/shubham-nishad-7b75a0244"}><AiFillLinkedin size={'18px'} /></Link>
            </li>
            <li>
              <Link to={"https://x.com/shubh72074"}><FaXTwitter size={'18px'} /></Link>
            </li>
          </ul>
        </section>
        <section className="page-link-wrapper">
          <ul className="page-links">
            <li><Link to={"/about"}>About Us</Link></li>
            <li><Link to={"/contact"}>Contact Us</Link></li>
            <li><Link to={"/privacy"}>Privacy Policy</Link></li>
            <li><Link to={"/terms"}>Terms of Service</Link></li>
            <li> <Link to={"/careers"}>Careers</Link></li>
          </ul>
          <ul className="page-links">
            <li><Link to={"/blog"}>Blog</Link></li>
            <li><Link to={"/faq"}>FAQ</Link></li>
            <li><Link to={"/help"}>Help Center</Link></li>
            <li><Link to={"/support"}>Support</Link></li>
          </ul>
          <ul className="page-links">
            <li><Link to={"/disclaimer"}>Disclaimer</Link></li>
            <li><Link to={"/cookies"}>Cookies Policy</Link></li>
            <li><Link to={"/gdpr"}>GDPR Compliance</Link></li>
            <li><Link to={"/ccpa"}>CCPA Compliance</Link></li>
          </ul>
        </section>
        <section className="support-links">
          <p>Need Help?</p> 
          <div className="support-links-wrapper">
            <div className="email-us">
       
                <Link to="mailto:support@hireme.com">
                  <button className="whatsapp-btn">
                    <MdEmail size={24}/>{""}
                    support@hireme.com
                  </button>
                </Link>
            
                <Link to="https://api.whatsapp.com/send?phone=919999999999&text=Hello%20I%20need%20help%20with%20...">
                  <button className="whatsapp-btn">
                    <MdWhatsapp size={24}/>{" "}
                      Chat on WhatsApp
                  </button>
                </Link>
            </div>
            <div className="call-us">
              <Link to="tel:+919999999999">
                <button className="whatsapp-btn"><MdCall size={24}/> +91 99999 99999</button>
              </Link>
              <Link to="tel:+9188888888888">
                <button className="whatsapp-btn"><MdCall size={24}/> +91 88888 88888</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className="bottom-footer">
        <p>All rights reserved &copy; 2025 2BrosTech Pvt Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
