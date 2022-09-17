import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CheckinList from "./components/Main/CheckinList";
import UpdateCheckin from "./components/Main/UpdateCheckin";
import CreateContract from './components/Main/CreateContract';
import MyContracts from './components/Main/MyContracts';
import Success from './components/Main/Success';
import Notifications from './components/Main/Notifications'
import NotificationDetails from './components/Main/NotificationDetails';
import ContractDetails from "./components/Main/ContractDetails";

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user &&
      <Route path="/" exact element={<Main />} >  
        <Route  path="contracts/" element={<MyContracts />} />
        <Route path="new-contract/" element={<CreateContract />} />
        <Route path="success/" element={<Success />} />
        <Route path="contract/:id" element={<ContractDetails />} />
        <Route path="checkins/" element={<CheckinList />} />
        <Route path="update-checkin/:id" element={<UpdateCheckin />} />
        <Route path="notifications/" element={<Notifications />} />
        <Route path='notification-details' element={<NotificationDetails/>} />
      </Route>
      }
      <Route path="signup" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} /> 
      
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/contracts" exact element={<Navigate replace to="/login" />} />
      <Route path="/checkins" exact element={<Navigate replace to="/login" />} />
      <Route path="/new-contract" exact element={<Navigate replace to="/login" />} />
      <Route path="/success/" exact element={<Navigate replace to="/login" />} />
      <Route path="contract/:id" exact element={<Navigate replace to="/login" />} />
      <Route path="notifications/" exact element={<Navigate replace to="/login" />} />
      <Route path="/update-checkin/:id" exact element={<Navigate replace to="/login" />} />
      <Route path="/notification-details/:id" exact element={<Navigate replace to="/login"/>}/>
    </Routes>
  );
}

export default App;
