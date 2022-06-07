import "./App.css"
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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { lazy, Suspense } from "react";
import { Users } from "tabler-icons-react";
import { Loader } from "@mantine/core";

const Auth = lazy(() => import("./pages/Auth/Auth"))
const User = lazy(() => import("./pages/Users/Users.jsx"))
const Home = lazy(() => import("./pages/home/Home"))
const Profile = lazy(() => import("./pages/Profile/Profile"))

const loader = () => {
  return (
    <div style={{display: "flex", width: "100%", height: "30px", justifyContent: "center", alignItems: "center"}}>
      <Loader variant="oval" size={"md"}/>
    </div>
  )
}

function App() {
  const { isAuthenticated } = useMoralis()

  return (
    <div className="App">
      {isAuthenticated && <LazyLoadImage className="logo-header" src={Logo} alt="" />}
      <ConnectButtonProvider />
      <BrowserRouter>
        <Suspense fallback={loader()}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/h" element={<Home />} />
              <Route path="/u/:address" element={<Profile />} />
              <Route path="/p" element={<User />} />
            </Route>
            {isAuthenticated &&
              <Route path="/auth" element={<Auth />} />
            }
            <Route
              path="*"
              element={<Navigate to="/h" />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
