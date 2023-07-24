import "./home.css";
import Header from "../../components/header/header";
import SearchBox from "../../components/searchjobs/searchBox";
import Footer from "../../components/footer/footer";
import ShowJobs from "../../components/jobs/showJobs";

const Home = () => {
  return (
    <>
    <Header/>
    <SearchBox/>
    <main role='main' className="main-container">
      <ShowJobs/>
    </main>
    <Footer/>
    </>
  )
}

export default Home;
