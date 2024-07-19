import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Terms from "./pages/terms/terms";
import About from "./pages/about/about";
import PageNotFound from "./pages/error/page-not-found";
import Blogs from "./components/blogs/Blogs";
import Login from "./components/login/Login";
import User from "./components/user/user.jsx";
import UserProfile from "./components/user/userprofile/userprofile";
import UserSettings from "./components/user/usersettings/usersettings";
import Employer from "./components/employer/employer";
import ShowJobs from "./components/jobs/showJobs.jsx";
import JobApply from "./components/job-apply/jobApply.jsx";
import FilterJobs from "./components/filterJobs/filterJobs.jsx";
import TypeFilterJobs from "./components/TypeFilter/TypeFilterJobs.jsx";
// import Dashboard from "./components/dashboard/dashboard.jsx";

function App() {
  const isLoggedIn = !!sessionStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/terms-and-policy/*" element={<Terms />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/login/*" element={isLoggedIn ? <Navigate to="/user" replace /> : <Login />}/>
        <Route path="/user/*" element={<User />} />
        <Route path="/user/profile/*" element={<UserProfile />} />
        <Route path="/user/settings/*" element={<UserSettings />} />
        <Route path="/employer/*" element={<Employer />} />
        <Route path="/blogs/:id" element={<Blogs />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/jobs" element={<ShowJobs/>} />
        <Route path="/job/:jobid" element={<JobApply/>} />
        <Route path="/jobs/:param" element={<FilterJobs/>} />
        <Route path="/jobss/:type" element={<TypeFilterJobs/>} />
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
      </Routes>
    </BrowserRouter>

  );
}


export default App;
