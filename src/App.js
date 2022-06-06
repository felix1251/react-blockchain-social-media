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

const Auth = lazy(() => import("./pages/Auth/Auth"))
const Home = lazy(() => import("./pages/home/Home"))
const Profile = lazy(() => import("./pages/Profile/Profile"))

function App() {
  const { isAuthenticated } = useMoralis()

  return (
    <div className="App">
      {isAuthenticated && <LazyLoadImage className="logo-header" src={Logo} alt="" />}
      <ConnectButtonProvider />
      <BrowserRouter>
        <Suspense fallback={<div>Loading....</div>}>
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
              element={<Navigate to="/h" />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
