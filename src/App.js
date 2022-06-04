import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Logo from "../src/img/logo.png";
import ProtectedRoutes from "./ProtectedRoutes";
import { useMoralis } from "react-moralis";
import ConnectButtonProvider from "./components/ConnectMoralis/ConnectButton";
import { useEffect } from "react";
function App() {
  // eslint-disable-next-line
  const { isAuthenticated, account, Moralis } = useMoralis()
  // useEffect(()=>{
  //   if(account)
  // })

  return (
    <div className="App">
      {isAuthenticated && <img className="logo-header" src={Logo} alt="" />}
      <ConnectButtonProvider/>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/h" element={<Home />} />
            <Route path="/u/:address" element={<Profile />} />
          </Route>
          {isAuthenticated &&
            <Route path="/auth" element={<Auth />} />
          }
          <Route
            path="*"
            element={<Navigate to="/h"/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
