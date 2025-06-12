import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Terms from "./pages/terms/terms";
import About from "./pages/about/about";
import PageNotFound from "./pages/error/page-not-found";
import Login from "./components/login/Login";
import User from "./components/user/user.jsx";
import UDashboard from "./components/user/udashboard.jsx";
import UJobs from "./components/user/ujobs.jsx";
import UAppliedJobs from "./components/user/uappliedjobs.jsx";
import UMessages from "./components/user/umessages.jsx";
import EmployerLogin from "./components/employer/employerlogin.jsx";
import Employer from "./components/employer/employer";
import ShowJobs from "./components/jobs/showJobs.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployerPrivateRoutes, UserPrivateRoutes } from "./utils/privateRoutes";
import ChatBox from "./components/chat/ChatBox.jsx";
import Applicants from "./components/employer/applicants/applicants.jsx";
import Messages from "./components/employer/messages/message.jsx";
import EmpDashboard from "./components/employer/dashboard/empDashboard.jsx";
import JobApply from "./components/job-apply/jobApply.jsx";
// import Dashboard from "./components/dashboard/dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/terms-and-policy" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<UserPrivateRoutes Component={<User/>}/>} >
          <Route index element={<UDashboard/>}/>
          <Route path="dashboard" element={<UDashboard/>}/>
          <Route path="jobs" element={<UJobs/>} />
          <Route path="applied-jobs" element={<UAppliedJobs/>} />
          <Route path="messages" element={<UMessages/>} >
            <Route path="chat" element={<ChatBox/>}/>
          </Route>
        </Route>
        <Route path="/user/login" element={<Login page="login" />} />
        <Route path="/user/register" element={<Login page="register" />} />
        <Route path="/employer" element={<EmployerPrivateRoutes Children={<Employer/>}/>} >
          <Route index element={<EmpDashboard/>}/>
          <Route path="dashboard" element={<EmpDashboard/>}/>
          <Route path="applicants" element={<Applicants/>}/>
          <Route path="messages" element={<Messages/>}>
            <Route path="chat" element={<ChatBox/>}/>
          </Route>
        </Route>
        <Route path="/employer/login" element={<EmployerLogin page="login" />} />
        <Route path="/employer/register" element={<EmployerLogin page="register" />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/jobs" element={<ShowJobs/>} />
        <Route path="/apply/:jobid" element={<JobApply/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>

  );
}


export default App;
