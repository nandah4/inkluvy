import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "./hooks/useAccessibilitySettings";
import Landing from "./pages/Landing";
import Community from "./pages/Community";
import AccessibleMap from "./pages/AccessibleMap";

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<AccessibleMap />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
