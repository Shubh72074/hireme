import "./home.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SearchBox from "../../components/searchjobs/searchBox";

const Home = () => {
  return (
    <div className="home-bg">
      <div className="home">
        <Header/>
        <SearchBox/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home;
