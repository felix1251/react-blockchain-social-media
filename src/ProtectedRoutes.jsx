import { useMoralis } from "react-moralis";
import { Outlet } from "react-router-dom";
import Auth from "./pages/Auth/Auth.jsx";

const UseAuth = () => {
      const { isAuthenticated } = useMoralis()
      return isAuthenticated 
}

const ProtectedRoutes = () =>{
      const isAuth = UseAuth()
      return isAuth ? <Outlet/> : <Auth/>
};

export default ProtectedRoutes