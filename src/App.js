import Home from "./pages/home/home";
import Terms from "./pages/terms/terms";
import About from "./pages/about/about";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PostJobs from "./pages/employer/postjobs";
import PageNotFound from "./pages/error/page-not-found";
import JobApply from "./components/job-apply/jobApply";
import FilterJobs from "./components/filterJobs/filterJobs";
import Blogs from "./components/blogs/Blogs";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/terms-and-policy" element={<Terms/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employer">
          <Route path="post-job" element={<PostJobs/>}/>
        </Route>
        <Route path="/job" >
          <Route path=":jobid" element = {<JobApply/>} />
          <Route exact path="/job/" element = {<Home/>} />
        </Route>
        <Route path="/jobs" >
          <Route path=":filter" element = {<FilterJobs/>} />
        </Route>
        <Route path="/blogs">
          <Route path=":id" element= {<Blogs/>} />
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
