import {
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import {FaXTwitter} from 'react-icons/fa6'
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <section>
          <p>JOB TYPES</p>
          <div><Link to={'/jobss/remote'}>Remote Jobs</Link></div>
          <div><Link to={'/jobss/part_time'}>Internships</Link></div>
          <div><Link to={'/jobss/full_time'}>Freelancing</Link></div>
        </section>
        <section>
          <p>PAGES</p>
          <div><Link to={'/terms'}>Terms of Use</Link></div>
          <div><Link to={'/policy'}>Privacy Policy</Link></div>
          <div><Link to={'/about'}>About</Link></div>
        </section>
        <section>
          <p>READ MORE</p>
          <div><Link to={'/blogs/1'}>What is AI?</Link></div>
          <div><Link to={'/blogs/2'}>What is Freelancing?</Link></div>
          <div><Link to={'/blogs/3'}>Remote Jobs are Future</Link></div>
        </section>
        <section>
          <p>F.A.Q</p>
          <div><Link to={'/faq/why-us'}>Why HireMe?</Link></div>
          <div><Link to={'/faq/posting-jobs'}>How to post a job?</Link></div>
          <div><Link to={'/faq/applying-jobs'}>Is there any fee to apply for a job?</Link></div>
        </section>
      </div>
      <div className="bottom-footer">
        <ul>
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
        <p>Copyright &copy;2023 DevShubh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
