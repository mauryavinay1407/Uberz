import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import LandingPage from "./pages/LandingPage";
import UserProtectedLayout from "./pages/UserProtectedLayout";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedLayout from "./pages/CaptainProtectedLayout";
import CaptainLogout from "./pages/CaptainLogout";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup/>} />
        <Route path="/captain-login" element={<Captainlogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/home" element={
          <UserProtectedLayout>
            <Home/>
          </UserProtectedLayout>
        } />
        <Route path="/user/logout" element={
          <UserProtectedLayout>
            <UserLogout/>
          </UserProtectedLayout>
        } />
        <Route path="/captain-home" element={
          <CaptainProtectedLayout>
            <CaptainHome/>
          </CaptainProtectedLayout>
          }/>
        <Route path="/captain/logout" element={
        <CaptainProtectedLayout>
          <CaptainLogout/>
        </CaptainProtectedLayout>
        }/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
