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
import { lazy, Suspense} from "react";
import { Loader } from "@mantine/core";

const Post = lazy(() => import("./pages/Post/Post.jsx"))
const Auth = lazy(() => import("./pages/Auth/Auth.jsx"))
const User = lazy(() => import("./pages/Users/Users.jsx"))
const Home = lazy(() => import("./pages/home/Home.jsx"))
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"))
const MobileNav = lazy(() => import("./components/Nav/MobileNav.jsx"))

const loader = () => {
  return (
    <div style={{display: "flex", width: "100%", height: "30px", justifyContent: "center", alignItems: "center"}}>
      <Loader variant="dots" color={"lime"} size={"lg"}/>
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
        {isAuthenticated && <MobileNav/>}
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/h" element={<Home />} />
              <Route path="/u/:address" element={<Profile />} />
              <Route path="/p" element={<User />} />
              <Route path="/t/:id" element={<Post />} />
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
