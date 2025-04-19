import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";

// Lazy load components for better performance
const Index = lazy(() => import("./views/index"));
const Home = lazy(() => import("./views/home"));
const Library = lazy(() => import("./views/library"));
const Subscribers = lazy(() => import("./views/subscribers"));
const Blogger = lazy(() => import("./views/blogger"));
const List = lazy(() => import("./views/list"));
const Setting = lazy(() => import("./views/setting"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Dashboard route */}
            <Route path="/" element={<Index />} />
            
            {/* Content management routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/blogger" element={<Blogger />} />
            
            {/* User management routes */}
            <Route path="/subscribers" element={<Subscribers />} />
            <Route path="/list" element={<List />} />
            
            {/* Settings */}
            <Route path="/settings" element={<Setting />} />
            
            {/* Fallback route for any unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
