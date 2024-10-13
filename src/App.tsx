import "./App.css";
import Layout from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Library from "./views/library";
import Index from "./views";
import Subscribers from "./views/subscribers";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/subscribers" element={<Subscribers />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;