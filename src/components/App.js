import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateOutlet from "./PrivateOutlet";
import PublicOutlet from "./PublicOutlet";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<PublicOutlet />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/login" element={<PublicOutlet />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/quiz/:id" element={<PrivateOutlet />}>
              <Route path="/quiz/:id" element={<Quiz />} />
            </Route>
            <Route path="/result/:id" element={<PrivateOutlet />}>
              <Route path="/result/:id" element={<Result />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
