import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./Pages/Workspace";
import Alloted from "./Pages/Alloted";
import Interview from "./Pages/Interview";
import Completed from "./Pages/Completed";
import Progress from "./Pages/Progress";
import Projects from "./Pages/Projects";
import Orders from "./Pages/Orders";
import Notifications from "./Pages/Notifications";
import ProjectDetails from "./Pages/ProjectDetails";
import LandingPage from "./Pages/LandingPage";
import HR from "./Pages/HR";
import Setup from "./Pages/Setup";
import EmployeeDetails from "./Pages/EmployeeDetails";
import EmployeHistory from "./Pages/EmployeHistory";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/Login/:depart" element={<Login />} /> 
          <Route path="/Workspace" element={<Workspace />} /> 
          <Route path="/Workspace/Alloted" element={<Alloted />} /> 
          <Route path="/Workspace/Interview" element={<Interview />} /> 
          <Route path="/Workspace/Completed" element={<Completed />} /> 
          <Route path="/Workspace/Progress" element={<Progress />} /> 
          <Route path="/Projects" element={<Projects />} /> 
          <Route path="/Orders" element={<Orders />} /> 
          <Route path="/Notifications" element={<Notifications />} /> 
          <Route path="/ProjectDetails/:id" element={<ProjectDetails />} /> 
          <Route path="/HR" element={<HR />} /> 
          <Route path="/Setup" element={<Setup />} /> 
          <Route path="/HR/EmployeeDetails/:id" element={<EmployeeDetails />} /> 
          <Route path="/HR/EmployeeDetails" element={<EmployeeDetails />} /> 
          <Route path="/HR/EmployeeHistory/:id" element={<EmployeHistory />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;