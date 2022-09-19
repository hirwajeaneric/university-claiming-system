import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CreateClaim from './components/Main/CreateClaim';
import MyClaims from './components/Main/MyClaims';
import Success from './components/Main/Success';
import Notifications from './components/Main/Notifications'
import NotificationDetails from './components/Main/NotificationDetails';
import ClaimDetails from "./components/Main/claimDetails";

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user &&
      <Route path="/" exact element={<Main />} >  
        <Route  path="claims/" element={<MyClaims />} />
        <Route path="new-claim/" element={<CreateClaim />} />
        <Route path="success/" element={<Success />} />
        <Route path="claim/:id" element={<ClaimDetails />} />
        <Route path="notifications/" element={<Notifications />} />
        <Route path='notification-details' element={<NotificationDetails/>} />
      </Route>
      }
      <Route path="signup" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} /> 
      
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/claims" exact element={<Navigate replace to="/login" />} />
      <Route path="/new-claim" exact element={<Navigate replace to="/login" />} />
      <Route path="/success/" exact element={<Navigate replace to="/login" />} />
      <Route path="claim/:id" exact element={<Navigate replace to="/login" />} />
      <Route path="notifications/" exact element={<Navigate replace to="/login" />} />
      <Route path="/notification-details/:id" exact element={<Navigate replace to="/login"/>}/>
    </Routes>
  );
}

export default App;
