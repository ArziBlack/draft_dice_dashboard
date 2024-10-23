import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./views";
import Home from "./views/home";
import Library from "./views/library";
import Layout from "./components/layout";
import Subscribers from "./views/subscribers";
import Blogger from "./views/blogger";
import Setting from "./views/setting";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/blogger" element={<Blogger/>}/>
          <Route path="/settings" element={<Setting/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
