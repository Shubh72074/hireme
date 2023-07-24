import {
  AiOutlineInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <section>
          <p>JOB TYPES</p>
          <div><Link to={'/jobs/remote-jobs'}>Remote Jobs</Link></div>
          <div><Link to={'/jobs/internships'}>Internships</Link></div>
          <div><Link to={'/jobs/part-time'}>Freelancing</Link></div>
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
            <Link to={"https://instagram.com"}><AiOutlineInstagram size={'16px'} /></Link>
          </li>
          <li>
            <Link to={"https://youtube.com"}><AiFillYoutube size={'18px'} /></Link>
          </li>
          <li>
            <Link to={"https://linkedin.com"}><AiFillLinkedin size={'16px'} /></Link>
          </li>
          <li>
            <Link to={"https://twitter.com"}><AiOutlineTwitter size={'16px'} /></Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
