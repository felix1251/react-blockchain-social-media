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
import ProtectedRoutes from "./ProtectedRoutes";
import { useMoralis } from "react-moralis";
import ConnectButtonProvider from "./components/ConnectMoralis/ConnectButton";
function App() {

  const { isAuthenticated } = useMoralis()
  return (
    <div className="App">
      <ConnectButtonProvider/>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/h" element={<Home />} />
            <Route path="/u" element={<Profile />} />
          </Route>
          {isAuthenticated &&
            <Route path="/auth" element={<Auth />} />
          }
          <Route
            path="*"
            element={<Navigate to="/h" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
